import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  alertId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['sensor', 'threat', 'system', 'security', 'maintenance'],
    index: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    index: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
  location: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    },
    zone: String
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'acknowledged', 'resolved', 'false_positive'],
    default: 'active',
    index: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
  escalationLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  escalatedAt: {
    type: Date
  },
  relatedAlerts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert'
  }],
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
    result: String
  }],
  notifications: [{
    channel: {
      type: String,
      enum: ['email', 'sms', 'push', 'webhook'],
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed', 'delivered'],
      default: 'pending'
    },
    attempts: {
      type: Number,
      default: 0
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
alertSchema.index({ severity: 1, status: 1, timestamp: -1 });
alertSchema.index({ type: 1, timestamp: -1 });
alertSchema.index({ 'source.type': 1, 'source.id': 1 });
alertSchema.index({ assignedTo: 1, status: 1 });
alertSchema.index({ 'location.zone': 1, status: 1 });

// Virtual for age
alertSchema.virtual('age').get(function() {
  return Date.now() - this.timestamp.getTime();
});

// Virtual for response time
alertSchema.virtual('responseTime').get(function() {
  if (this.resolvedAt) {
    return this.resolvedAt.getTime() - this.timestamp.getTime();
  }
  return null;
});

// Instance methods
alertSchema.methods.acknowledge = function(userId) {
  this.acknowledgedBy = userId;
  this.acknowledgedAt = new Date();
  this.status = 'acknowledged';
  return this.save();
};

alertSchema.methods.resolve = function(userId) {
  this.resolvedBy = userId;
  this.resolvedAt = new Date();
  this.status = 'resolved';
  return this.save();
};

alertSchema.methods.escalate = function() {
  this.escalationLevel += 1;
  this.escalatedAt = new Date();
  return this.save();
};

alertSchema.methods.addAction = function(action) {
  this.actions.push(action);
  return this.save();
};

alertSchema.methods.addNotification = function(notification) {
  this.notifications.push(notification);
  return this.save();
};

// Static methods
alertSchema.statics.getActiveBySeverity = function(severity) {
  return this.find({ severity, status: { $in: ['active', 'acknowledged'] }, isActive: true })
    .sort({ timestamp: -1 });
};

alertSchema.statics.getBySource = function(sourceType, sourceId) {
  return this.find({ 
    'source.type': sourceType, 
    'source.id': sourceId,
    isActive: true 
  }).sort({ timestamp: -1 });
};

alertSchema.statics.getUnacknowledged = function() {
  return this.find({ status: 'active', isActive: true })
    .sort({ severity: 1, timestamp: 1 }); // Most severe and oldest first
};

alertSchema.statics.getStatsByTimeRange = function(startDate, endDate) {
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
        _id: {
          severity: '$severity',
          type: '$type'
        },
        count: { $sum: 1 },
        avgResponseTime: {
          $avg: {
            $cond: [
              { $ne: ['$resolvedAt', null] },
              { $subtract: ['$resolvedAt', '$timestamp'] },
              null
            ]
          }
        }
      }
    }
  ]);
};

export default mongoose.model('Alert', alertSchema);
