import mongoose from 'mongoose';

const threatSchema = new mongoose.Schema({
  threatId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['critical', 'high', 'medium', 'low'],
    index: true
  },
  type: {
    type: String,
    required: true,
    index: true
  },
  location: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      lat: {
        type: Number,
        min: -90,
        max: 90
      },
      lng: {
        type: Number,
        min: -180,
        max: 180
      }
    },
    zone: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'resolved', 'investigating', 'false_positive'],
    default: 'active',
    index: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    type: {
      type: String,
      enum: ['sensor', 'system', 'user', 'ml_model'],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  relatedSensors: [{
    type: String,
    ref: 'Sensor'
  }],
  escalationLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  escalatedAt: {
    type: Date
  },
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acknowledgedAt: {
    type: Date
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: {
    type: Date
  },
  resolutionNotes: {
    type: String
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  impactRadius: {
    type: Number,
    default: 0
  },
  estimatedDamage: {
    type: Number,
    default: 0
  },
  responseTime: {
    type: Number // in minutes
  },
  actions: [{
    type: {
      type: String,
      enum: ['notification', 'automation', 'escalation', 'shutdown', 'maintenance'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    executedAt: {
      type: Date,
      default: Date.now
    },
    executedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'executed', 'failed', 'cancelled'],
      default: 'pending'
    },
    result: {
      type: String
    }
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
threatSchema.index({ 'location.coordinates': '2dsphere' });
threatSchema.index({ severity: 1, status: 1, timestamp: -1 });
threatSchema.index({ type: 1, timestamp: -1 });
threatSchema.index({ 'location.zone': 1, status: 1 });
threatSchema.index({ assignedTo: 1, status: 1 });
threatSchema.index({ riskScore: -1, timestamp: -1 });

// Virtual for duration
threatSchema.virtual('duration').get(function() {
  if (this.resolvedAt) {
    return this.resolvedAt.getTime() - this.timestamp.getTime();
  }
  return Date.now() - this.timestamp.getTime();
});

// Virtual for age
threatSchema.virtual('age').get(function() {
  return Date.now() - this.timestamp.getTime();
});

// Instance methods
threatSchema.methods.acknowledge = function(userId) {
  this.acknowledgedBy = userId;
  this.acknowledgedAt = new Date();
  this.status = 'investigating';
  return this.save();
};

threatSchema.methods.resolve = function(userId, notes) {
  this.resolvedBy = userId;
  this.resolvedAt = new Date();
  this.resolutionNotes = notes;
  this.status = 'resolved';
  this.responseTime = Math.floor((this.resolvedAt.getTime() - this.timestamp.getTime()) / (1000 * 60));
  return this.save();
};

threatSchema.methods.escalate = function() {
  this.escalationLevel += 1;
  this.escalatedAt = new Date();
  return this.save();
};

threatSchema.methods.addAction = function(action) {
  this.actions.push(action);
  return this.save();
};

// Static methods
threatSchema.statics.getActiveBySeverity = function(severity) {
  return this.find({ severity, status: 'active', isActive: true })
    .sort({ timestamp: -1 });
};

threatSchema.statics.getByLocation = function(zone) {
  return this.find({ 'location.zone': zone, isActive: true })
    .sort({ timestamp: -1 });
};

threatSchema.statics.getNearby = function(lat, lng, maxDistance = 5000) {
  return this.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: maxDistance
      }
    },
    isActive: true
  });
};

threatSchema.statics.getStatsByTimeRange = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        timestamp: {
          $gte: startDate,
          $lte: endDate
        },
        isActive: true
      }
    },
    {
      $group: {
        _id: '$severity',
        count: { $sum: 1 },
        avgRiskScore: { $avg: '$riskScore' },
        avgResponseTime: { $avg: '$responseTime' }
      }
    }
  ]);
};

export default mongoose.model('Threat', threatSchema);
