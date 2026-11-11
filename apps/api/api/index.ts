import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../src/db.js';
import { verifyToken, type AuthPayload } from '../src/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const endpoint = Array.isArray(path) ? path.join('/') : path || '';

  const authUser: AuthPayload | null = verifyToken(req.headers.authorization);
  if (!authUser || isNaN(authUser.userId)) {
    res.status(401).json({ error: 'Unauthorized token' });
    return;
  }

  try {
    if (req.method === 'GET' && endpoint === 'account/me') {
      const users = await sql`
        SELECT id, name, email, phone, default_location 
        FROM users 
        WHERE id = ${authUser.userId} 
        LIMIT 1
      `;

      if (users.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const addresses = await sql`
        SELECT * 
        FROM customer_addresses 
        WHERE user_id = ${authUser.userId} 
        ORDER BY created_at DESC
      `;

      const orders = await sql`
        SELECT * 
        FROM customer_orders 
        WHERE user_id = ${authUser.userId} 
        ORDER BY created_at DESC
      `;

      res.status(200).json({ user: users[0], addresses, orders });
      return;
    }

    res.status(404).json({ error: 'Endpoint route not found' });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}