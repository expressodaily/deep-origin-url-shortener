import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 4000, 
    FRONTEND_PUBLIC_URL: process.env.FRONTEND_PUBLIC_URL || '*'
}

export const db = {
    name: process.env.DB_NAME || 'url-shortner-db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '27017',
    user: process.env.DB_USER || '',
    password: process.env.DB_USER_PWD || '',
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
  };
  