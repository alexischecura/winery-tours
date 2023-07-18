import { PrismaClient } from '@prisma/client';

require('dotenv').config();
import { env } from './configs/env.config';

import { connectRedisDB } from './databases/redis.db';
import app from './app';

connectRedisDB();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const prisma = new PrismaClient();

async function startServer() {
  const port = env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
  });
}

startServer()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
