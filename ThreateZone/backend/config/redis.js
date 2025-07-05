import Redis from 'ioredis';
import { config } from './config.js';

let redisClient = null;
let isConnected = false;

export const initializeRedis = async () => {
  if (isConnected && redisClient) {
    console.log('📊 Redis already connected');
    return redisClient;
  }

  try {
    console.log('🔌 Connecting to Redis...');
    console.log('📍 Redis Host:', config.redis.host);
    console.log('🔢 Redis Port:', config.redis.port);

    redisClient = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      db: config.redis.db,
      keyPrefix: config.redis.keyPrefix,
      retryDelayOnFailover: config.redis.retryDelayOnFailover,
      maxRetriesPerRequest: config.redis.maxRetriesPerRequest,
      lazyConnect: true,
      // Connection timeout
      connectTimeout: 10000,
      // Command timeout
      commandTimeout: 5000,
      // Retry strategy
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        console.log(`🔄 Redis retry attempt ${times}, delay: ${delay}ms`);
        return delay;
      }
    });

    // Event handlers
    redisClient.on('connect', () => {
      console.log('✅ Redis connected successfully');
      isConnected = true;
    });

    redisClient.on('ready', () => {
      console.log('🚀 Redis ready for commands');
    });

    redisClient.on('error', (error) => {
      console.error('❌ Redis connection error:', error.message);
      isConnected = false;
    });

    redisClient.on('close', () => {
      console.warn('⚠️ Redis connection closed');
      isConnected = false;
    });

    redisClient.on('reconnecting', () => {
      console.log('🔄 Redis reconnecting...');
    });

    redisClient.on('end', () => {
      console.log('🔚 Redis connection ended');
      isConnected = false;
    });

    // Try to connect
    await redisClient.connect();

    // Test the connection
    await redisClient.ping();
    console.log('🏓 Redis ping successful');

    return redisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error.message);
    console.warn('⚠️ Continuing without Redis (caching disabled)');
    isConnected = false;
    redisClient = null;
    return null;
  }
};

export const getRedisClient = () => {
  return redisClient;
};

export const getConnectionStatus = () => {
  return {
    isConnected,
    status: redisClient ? redisClient.status : 'disconnected'
  };
};

export const closeConnection = async () => {
  if (redisClient) {
    try {
      await redisClient.quit();
      console.log('🔒 Redis connection closed');
    } catch (error) {
      console.error('❌ Error closing Redis connection:', error);
    } finally {
      redisClient = null;
      isConnected = false;
    }
  }
};

// Cache helper functions
export const cacheSet = async (key, value, ttl = 3600) => {
  if (!redisClient || !isConnected) return false;
  
  try {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await redisClient.setex(key, ttl, serializedValue);
    } else {
      await redisClient.set(key, serializedValue);
    }
    return true;
  } catch (error) {
    console.error('❌ Redis cache set error:', error);
    return false;
  }
};

export const cacheGet = async (key) => {
  if (!redisClient || !isConnected) return null;
  
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('❌ Redis cache get error:', error);
    return null;
  }
};

export const cacheDel = async (key) => {
  if (!redisClient || !isConnected) return false;
  
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('❌ Redis cache delete error:', error);
    return false;
  }
};

export const cacheExists = async (key) => {
  if (!redisClient || !isConnected) return false;
  
  try {
    const exists = await redisClient.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('❌ Redis cache exists error:', error);
    return false;
  }
};

export const cacheFlush = async () => {
  if (!redisClient || !isConnected) return false;
  
  try {
    await redisClient.flushdb();
    console.log('🧹 Redis cache flushed');
    return true;
  } catch (error) {
    console.error('❌ Redis cache flush error:', error);
    return false;
  }
};

// Pub/Sub helpers
export const publish = async (channel, message) => {
  if (!redisClient || !isConnected) return false;
  
  try {
    await redisClient.publish(channel, JSON.stringify(message));
    return true;
  } catch (error) {
    console.error('❌ Redis publish error:', error);
    return false;
  }
};

export const subscribe = async (channel, callback) => {
  if (!redisClient || !isConnected) return false;
  
  try {
    const subscriber = redisClient.duplicate();
    await subscriber.subscribe(channel);
    
    subscriber.on('message', (receivedChannel, message) => {
      if (receivedChannel === channel) {
        try {
          const parsedMessage = JSON.parse(message);
          callback(parsedMessage);
        } catch (error) {
          console.error('❌ Redis message parse error:', error);
        }
      }
    });
    
    return subscriber;
  } catch (error) {
    console.error('❌ Redis subscribe error:', error);
    return false;
  }
};

export default redisClient;
