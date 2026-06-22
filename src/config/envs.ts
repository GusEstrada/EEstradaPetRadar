import 'dotenv/config';

export const envs = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT) || 5433,
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_NAME: process.env.DB_NAME || 'pet-radar',

  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

  MAILER_EMAIL: process.env.MAILER_EMAIL || 'test@test.com',
  MAILER_SECRET_KEY: process.env.MAILER_SECRET_KEY || 'test',

  AZURE_INSIGHTS_CONNECTION_STRING:
    process.env.APPINSIGHTS_CONNECTION_STRING || '',
};
