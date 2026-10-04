import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth';

dotenv.config({ path: '../../.env' });

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

app.get('/health', (req, res) => res.json({ status: 'API is running' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`[API] Server running on port ${PORT}`));
