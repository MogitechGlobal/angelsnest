import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
import path from 'path';
import * as schema from './schema';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
export * from './schema';
