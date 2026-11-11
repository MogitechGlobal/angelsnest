// apps/api/src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';

dotenv.config({ path: '../../.env' });

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://angelesnest.co.ke',
  'https://www.angelesnest.co.ke',
  'https://angelsnest.co.ke',
  'https://www.angelsnest.co.ke'
];

// 1. Direct Low-Level CORS Middleware (handles all preflight OPTIONS cleanly)
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (origin) {
    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.pages.dev');

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Intercept and resolve preflight immediately
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  next();
});

app.use(express.json());
app.use(cookieParser());

// 2. Mount under both /auth and /api/auth to prevent Vercel route mismatch issues
app.use('/auth', authRouter);
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'API is running' }));
app.get('/api/health', (req, res) => res.json({ status: 'API is running' }));

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`[API] Server running on port ${PORT}`));
}

export default app;