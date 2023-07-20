import { PrismaClient } from '@prisma/client';
require('dotenv').config();
import { envVars } from './configs/env.config';
import { connectRedisDB } from './databases/redis.db';
import app from './app';

connectRedisDB();

const prisma = new PrismaClient();

async function startServer() {
  const port = envVars.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
  });
}

startServer()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
