import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    'Warning: DATABASE_URL is not defined in process.env. Ensure your .env file is loaded.'
  );
}

const client = neon(connectionString || '');

export const db = drizzle(client, { schema });
export * from './schema.js';