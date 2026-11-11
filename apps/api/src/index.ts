// apps/api/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.js';

dotenv.config({ path: '../../.env' });

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://angelesnest.co.ke',
  'https://www.angelsnest.co.ke'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.pages.dev')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Mount under /api/auth so it matches frontend requests
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'API is running' }));

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`[API] Server running on port ${PORT}`));
}

export default app;