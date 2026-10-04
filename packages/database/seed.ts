import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { db, roles, users } from './src';
import bcrypt from 'bcrypt';

async function seed() {
  const roleRes = await db.insert(roles).values({ name: 'Super Admin' }).returning();
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.insert(users).values({
    name: 'Admin',
    email: 'admin@angelsnest.co.ke',
    passwordHash: hashedPassword,
    roleId: roleRes[0].id
  });
  console.log('Seed complete. Credentials: admin@angelsnest.co.ke / admin123');
  process.exit(0);
}
seed();
