import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db, users } from '@angelsnest/database';
import { eq } from 'drizzle-orm';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = result[0];

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.roleId }, process.env.AUTH_SECRET || 'dev-secret', { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
  res.json({ message: 'Logged in successfully', user: { id: user.id, name: user.name, email: user.email } });
});

authRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});
