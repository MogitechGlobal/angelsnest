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
  'https://www.angelesnest.co.ke',
  'https://angelsnest.co.ke',
  'https://www.angelsnest.co.ke'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const isAllowed =
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.pages.dev');

    if (isAllowed) {
      callback(null, true);
    } else {
      // Pass null, false instead of new Error(...) to avoid triggering a 500 internal server error
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 204
};

// 1. Mount CORS middleware
app.use(cors(corsOptions));

// 2. Explicitly handle all preflight OPTIONS requests before body parsers
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// 3. Mount API routers
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'API is running' }));

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`[API] Server running on port ${PORT}`));
}

export default app;