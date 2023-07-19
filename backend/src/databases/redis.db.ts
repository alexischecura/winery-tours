import { createClient } from 'redis';
import { env } from '../configs/env.config';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

export const connectRedisDB = async () => {
  try {
    await redisClient.connect();
    console.log('Redis DB connection successful');
  } catch (error) {
    console.error(`Error in the connection to Redis DB: ${error}`);
    console.log('Trying again in 3 seconds');
    setTimeout(connectRedisDB, 3000);
  }
};
