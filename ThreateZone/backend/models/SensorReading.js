import mongoose from 'mongoose';

const sensorReadingSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['normal', 'warning', 'critical'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quality: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  processed: {
    type: Boolean,
    default: false
  },
  anomalyScore: {
    type: Number,
    min: 0,
    max: 1,
    default: 0
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
sensorReadingSchema.index({ sensorId: 1, timestamp: -1 });
sensorReadingSchema.index({ timestamp: -1, status: 1 });
sensorReadingSchema.index({ sensorId: 1, status: 1, timestamp: -1 });
sensorReadingSchema.index({ type: 1, timestamp: -1 });
sensorReadingSchema.index({ location: 1, timestamp: -1 });

// TTL index to automatically delete old readings (30 days)
sensorReadingSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

// Static methods
sensorReadingSchema.statics.getLatestBySensor = function(sensorId) {
  return this.findOne({ sensorId }).sort({ timestamp: -1 });
};

sensorReadingSchema.statics.getReadingsInRange = function(sensorId, startDate, endDate) {
  return this.find({
    sensorId,
    timestamp: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ timestamp: 1 });
};

sensorReadingSchema.statics.getCriticalReadings = function(limit = 100) {
  return this.find({ status: 'critical' })
    .sort({ timestamp: -1 })
    .limit(limit);
};

sensorReadingSchema.statics.getAverageByTimeRange = function(sensorId, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        sensorId,
        timestamp: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: null,
        avgValue: { $avg: '$value' },
        minValue: { $min: '$value' },
        maxValue: { $max: '$value' },
        count: { $sum: 1 }
      }
    }
  ]);
};

sensorReadingSchema.statics.getHourlyAggregates = function(sensorId, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        sensorId,
        timestamp: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' },
          day: { $dayOfMonth: '$timestamp' },
          hour: { $hour: '$timestamp' }
        },
        avgValue: { $avg: '$value' },
        minValue: { $min: '$value' },
        maxValue: { $max: '$value' },
        count: { $sum: 1 },
        criticalCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'critical'] }, 1, 0]
          }
        },
        warningCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'warning'] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.day': 1,
        '_id.hour': 1
      }
    }
  ]);
};

// Instance methods
sensorReadingSchema.methods.isAnomalous = function() {
  return this.anomalyScore > 0.7;
};

sensorReadingSchema.methods.getTimeSinceReading = function() {
  return Date.now() - this.timestamp.getTime();
};

export default mongoose.model('SensorReading', sensorReadingSchema);
