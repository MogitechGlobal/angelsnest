// apps/api/src/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export interface AuthPayload {
  userId: number;
  email: string;
  name: string;
}

export function signToken(user: { id: number | string; email: string; name: string }): string {
  return jwt.sign(
    { sub: String(user.id), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

export function verifyToken(authHeader: string | undefined | null): AuthPayload | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string; email: string; name: string };
    const parsedId = parseInt(decoded.sub, 10);
    if (isNaN(parsedId)) return null;

    return {
      userId: parsedId,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    return null;
  }
}