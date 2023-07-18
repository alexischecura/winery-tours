import { createClient } from 'redis';
import { env } from '../configs/env.config';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

export const connectRedisDB = async () => {
  try {
    await redisClient.connect();
    console.log('Redis DB connection successful');
    redisClient.set('connectMessage', 'Redis DB connection successful');
  } catch (error) {
    console.error(error);
    setTimeout(connectRedisDB, 2000);
  }
};
