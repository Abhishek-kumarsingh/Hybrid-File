import SensorReading from '../models/SensorReading.js';
import Threat from '../models/Threat.js';
import { cacheSet, cacheGet } from '../config/redis.js';

// Simple anomaly detection using statistical methods
class AnomalyDetector {
  constructor() {
    this.models = new Map();
    this.isInitialized = false;
  }

  // Initialize models for each sensor
  async initialize() {
    try {
      console.log('🤖 Initializing machine learning models...');
      
      // Get unique sensor IDs
      const sensorIds = await SensorReading.distinct('sensorId');
      
      for (const sensorId of sensorIds) {
        await this.trainModel(sensorId);
      }
      
      this.isInitialized = true;
      console.log(`✅ ML models initialized for ${sensorIds.length} sensors`);
      
    } catch (error) {
      console.error('❌ Error initializing ML models:', error);
    }
  }

  // Train model for a specific sensor using historical data
  async trainModel(sensorId) {
    try {
      // Get last 1000 readings for training
      const readings = await SensorReading.find({ sensorId })
        .sort({ timestamp: -1 })
        .limit(1000)
        .select('value timestamp status');

      if (readings.length < 10) {
        console.log(`⚠️ Insufficient data for sensor ${sensorId}`);
        return;
      }

      const values = readings.map(r => r.value);
      
      // Calculate statistical parameters
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
      const stdDev = Math.sqrt(variance);
      
      // Calculate percentiles for threshold detection
      const sortedValues = [...values].sort((a, b) => a - b);
      const p5 = sortedValues[Math.floor(0.05 * sortedValues.length)];
      const p95 = sortedValues[Math.floor(0.95 * sortedValues.length)];
      const p1 = sortedValues[Math.floor(0.01 * sortedValues.length)];
      const p99 = sortedValues[Math.floor(0.99 * sortedValues.length)];

      // Simple trend analysis
      const recentReadings = readings.slice(0, 50);
      const trend = this.calculateTrend(recentReadings.map(r => r.value));

      const model = {
        sensorId,
        mean,
        stdDev,
        variance,
        min: Math.min(...values),
        max: Math.max(...values),
        p1, p5, p95, p99,
        trend,
        lastTrained: new Date(),
        sampleSize: readings.length
      };

      this.models.set(sensorId, model);
      
      // Cache the model
      await cacheSet(`ml:model:${sensorId}`, model, 3600); // 1 hour TTL
      
      console.log(`🎯 Trained model for sensor ${sensorId}`);
      
    } catch (error) {
      console.error(`❌ Error training model for sensor ${sensorId}:`, error);
    }
  }

  // Calculate simple linear trend
  calculateTrend(values) {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }

  // Detect anomaly in a sensor reading
  async detectAnomaly(reading) {
    try {
      let model = this.models.get(reading.sensorId);
      
      // Try to get model from cache if not in memory
      if (!model) {
        model = await cacheGet(`ml:model:${reading.sensorId}`);
        if (model) {
          this.models.set(reading.sensorId, model);
        }
      }

      // If no model exists, train one
      if (!model) {
        await this.trainModel(reading.sensorId);
        model = this.models.get(reading.sensorId);
      }

      if (!model) {
        return { isAnomaly: false, score: 0, reason: 'No model available' };
      }

      const value = reading.value;
      let anomalyScore = 0;
      const reasons = [];

      // Z-score based detection
      const zScore = Math.abs((value - model.mean) / model.stdDev);
      if (zScore > 3) {
        anomalyScore += 0.4;
        reasons.push(`High Z-score: ${zScore.toFixed(2)}`);
      } else if (zScore > 2) {
        anomalyScore += 0.2;
        reasons.push(`Moderate Z-score: ${zScore.toFixed(2)}`);
      }

      // Percentile-based detection
      if (value < model.p1 || value > model.p99) {
        anomalyScore += 0.3;
        reasons.push('Value in extreme percentile (1% or 99%)');
      } else if (value < model.p5 || value > model.p95) {
        anomalyScore += 0.1;
        reasons.push('Value in outer percentile (5% or 95%)');
      }

      // Sudden change detection (if we have recent readings)
      const recentReadings = await SensorReading.find({ sensorId: reading.sensorId })
        .sort({ timestamp: -1 })
        .limit(5)
        .select('value');

      if (recentReadings.length > 0) {
        const recentMean = recentReadings.reduce((a, b) => a + b.value, 0) / recentReadings.length;
        const changeRate = Math.abs((value - recentMean) / recentMean);
        
        if (changeRate > 0.5) {
          anomalyScore += 0.3;
          reasons.push(`High change rate: ${(changeRate * 100).toFixed(1)}%`);
        } else if (changeRate > 0.2) {
          anomalyScore += 0.1;
          reasons.push(`Moderate change rate: ${(changeRate * 100).toFixed(1)}%`);
        }
      }

      // Trend deviation
      if (model.trend !== 0) {
        const expectedValue = model.mean + model.trend * 10; // Rough prediction
        const trendDeviation = Math.abs(value - expectedValue) / model.stdDev;
        
        if (trendDeviation > 2) {
          anomalyScore += 0.2;
          reasons.push('Significant trend deviation');
        }
      }

      const isAnomaly = anomalyScore > 0.7;

      return {
        isAnomaly,
        score: Math.min(anomalyScore, 1),
        confidence: Math.min(anomalyScore * 1.2, 1),
        reasons: reasons.join('; '),
        model: {
          mean: model.mean,
          stdDev: model.stdDev,
          lastTrained: model.lastTrained
        }
      };

    } catch (error) {
      console.error('❌ Error detecting anomaly:', error);
      return { isAnomaly: false, score: 0, reason: 'Detection error' };
    }
  }

  // Predict future values (simple linear prediction)
  async predictValue(sensorId, hoursAhead = 1) {
    try {
      const model = this.models.get(sensorId);
      if (!model) {
        return null;
      }

      // Simple linear prediction based on trend
      const prediction = model.mean + (model.trend * hoursAhead * 12); // 12 readings per hour (5-min intervals)
      
      return {
        sensorId,
        predictedValue: prediction,
        hoursAhead,
        confidence: Math.max(0.3, 1 - Math.abs(model.trend) * 0.1),
        timestamp: new Date(Date.now() + hoursAhead * 60 * 60 * 1000)
      };

    } catch (error) {
      console.error('❌ Error predicting value:', error);
      return null;
    }
  }

  // Get model statistics
  getModelStats() {
    const stats = {
      totalModels: this.models.size,
      isInitialized: this.isInitialized,
      models: []
    };

    for (const [sensorId, model] of this.models) {
      stats.models.push({
        sensorId,
        mean: model.mean,
        stdDev: model.stdDev,
        sampleSize: model.sampleSize,
        lastTrained: model.lastTrained,
        trend: model.trend
      });
    }

    return stats;
  }

  // Retrain all models
  async retrainAll() {
    console.log('🔄 Retraining all ML models...');
    const sensorIds = Array.from(this.models.keys());
    
    for (const sensorId of sensorIds) {
      await this.trainModel(sensorId);
    }
    
    console.log('✅ All models retrained');
  }
}

// Risk assessment service
class RiskAssessment {
  static calculateThreatZoneRisk(threats, sensors) {
    // Simple risk calculation based on threat density and severity
    const riskFactors = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1
    };

    let totalRisk = 0;
    let threatCount = 0;

    threats.forEach(threat => {
      if (threat.status === 'active') {
        totalRisk += riskFactors[threat.severity] || 1;
        threatCount++;
      }
    });

    // Factor in sensor health
    const criticalSensors = sensors.filter(s => s.status === 'critical').length;
    const warningSensors = sensors.filter(s => s.status === 'warning').length;
    
    totalRisk += criticalSensors * 2 + warningSensors * 1;

    // Normalize to 0-100 scale
    const maxPossibleRisk = threats.length * 4 + sensors.length * 2;
    const riskScore = maxPossibleRisk > 0 ? (totalRisk / maxPossibleRisk) * 100 : 0;

    return {
      riskScore: Math.min(riskScore, 100),
      threatCount,
      criticalSensors,
      warningSensors,
      riskLevel: riskScore > 80 ? 'critical' : 
                 riskScore > 60 ? 'high' : 
                 riskScore > 30 ? 'medium' : 'low'
    };
  }
}

// Global instances
const anomalyDetector = new AnomalyDetector();

// Initialize ML services
export const initializeMachineLearning = async () => {
  try {
    await anomalyDetector.initialize();
    
    // Set up periodic retraining (every hour)
    setInterval(async () => {
      await anomalyDetector.retrainAll();
    }, 60 * 60 * 1000);
    
    console.log('🤖 Machine learning services initialized');
    
  } catch (error) {
    console.error('❌ Error initializing ML services:', error);
  }
};

// Export services
export {
  anomalyDetector,
  RiskAssessment
};

export default {
  initializeMachineLearning,
  anomalyDetector,
  RiskAssessment
};
