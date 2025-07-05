import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'operator', 'analyst', 'viewer'],
    default: 'viewer'
  },
  permissions: [{
    type: String,
    enum: [
      'read',
      'write',
      'delete',
      'admin',
      'manage_users',
      'manage_sensors',
      'manage_threats',
      'view_analytics',
      'export_data',
      'system_config'
    ]
  }],
  avatar: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      }
    },
    dashboard: {
      layout: [{
        type: String
      }],
      refreshInterval: {
        type: Number,
        default: 30000
      }
    }
  },
  contactInfo: {
    phone: {
      type: String
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  department: {
    type: String
  },
  location: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.loginAttempts;
      delete ret.lockUntil;
      return ret;
    }
  }
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ department: 1 });

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incrementLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  });
};

userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

userSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission) || this.role === 'admin';
};

userSchema.methods.hasRole = function(role) {
  return this.role === role;
};

userSchema.methods.updatePreferences = function(newPreferences) {
  this.preferences = { ...this.preferences, ...newPreferences };
  return this.save();
};

// Static methods
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase(), isActive: true });
};

userSchema.statics.findByRole = function(role) {
  return this.find({ role, isActive: true });
};

userSchema.statics.getActiveUsers = function() {
  return this.find({ isActive: true }).select('-password');
};

userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        active: {
          $sum: {
            $cond: [{ $eq: ['$isActive', true] }, 1, 0]
          }
        }
      }
    }
  ]);
};

// Set default permissions based on role
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('role')) {
    switch (this.role) {
      case 'admin':
        this.permissions = ['read', 'write', 'delete', 'admin', 'manage_users', 'manage_sensors', 'manage_threats', 'view_analytics', 'export_data', 'system_config'];
        break;
      case 'operator':
        this.permissions = ['read', 'write', 'manage_sensors', 'manage_threats', 'view_analytics'];
        break;
      case 'analyst':
        this.permissions = ['read', 'view_analytics', 'export_data'];
        break;
      case 'viewer':
        this.permissions = ['read'];
        break;
      default:
        this.permissions = ['read'];
    }
  }
  next();
});

export default mongoose.model('User', userSchema);
