import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['pressure', 'temperature', 'vibration', 'gas', 'flow', 'level', 'ph', 'conductivity']
  },
  location: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
      },
      lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
      }
    },
    zone: {
      type: String,
      required: true
    }
  },
  specifications: {
    minValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    resolution: {
      type: Number,
      required: true
    }
  },
  thresholds: {
    warning: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    },
    critical: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    }
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'maintenance', 'error'],
    default: 'online'
  },
  installationDate: {
    type: Date,
    required: true
  },
  lastMaintenance: {
    type: Date,
    required: true
  },
  nextMaintenance: {
    type: Date,
    required: true
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100
  },
  signalStrength: {
    type: Number,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
sensorSchema.index({ 'location.coordinates': '2dsphere' });
sensorSchema.index({ type: 1, status: 1 });
sensorSchema.index({ 'location.zone': 1 });
sensorSchema.index({ createdAt: -1 });

// Virtual for latest reading
sensorSchema.virtual('latestReading', {
  ref: 'SensorReading',
  localField: 'sensorId',
  foreignField: 'sensorId',
  justOne: true,
  options: { sort: { timestamp: -1 } }
});

// Instance methods
sensorSchema.methods.isInWarningRange = function(value) {
  return value < this.thresholds.warning.min || value > this.thresholds.warning.max;
};

sensorSchema.methods.isInCriticalRange = function(value) {
  return value < this.thresholds.critical.min || value > this.thresholds.critical.max;
};

sensorSchema.methods.getStatus = function(value) {
  if (this.isInCriticalRange(value)) return 'critical';
  if (this.isInWarningRange(value)) return 'warning';
  return 'normal';
};

// Static methods
sensorSchema.statics.findByZone = function(zone) {
  return this.find({ 'location.zone': zone, isActive: true });
};

sensorSchema.statics.findByType = function(type) {
  return this.find({ type, isActive: true });
};

sensorSchema.statics.findNearby = function(lat, lng, maxDistance = 1000) {
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

export default mongoose.model('Sensor', sensorSchema);
