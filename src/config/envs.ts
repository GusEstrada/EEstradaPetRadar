import 'dotenv/config';

export const envs = {

  DB_HOST: process.env.DB_HOST || 'localhost',

  DB_PORT: Number(process.env.DB_PORT) || 5433,

  DB_USER: process.env.DB_USER || 'postgres',

  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',

  DB_NAME: process.env.DB_NAME || 'pet-radar',

  MAILER_EMAIL: process.env.MAILER_EMAIL || 'test@test.com',

  MAILER_PASSWORD: process.env.MAILER_PASSWORD || 'test'

};