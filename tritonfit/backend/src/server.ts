// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/auth';
import { verifyToken, AuthRequest } from './middleware/verify';
import './config/passport';
import dotenv from 'dotenv';
import userRoutes from './routes/user';


dotenv.config({ path: '.env' });

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Initialize passport
app.use(passport.initialize());

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Server is running' });
});

// Auth routes (unprotected)
app.use('/auth', authRoutes);

// Protected routes
const protectedRouter = express.Router();

protectedRouter.use('/user', userRoutes);

// Middleware to verify token for all protected routes
protectedRouter.use((req: Request, res: Response, next: NextFunction) => {
  verifyToken(req as AuthRequest, res, next);
});

// Example protected route
protectedRouter.get('/protected-data', async (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      message: 'Protected data accessed successfully',
      user: req.user
    });
  } catch (error) {
    console.error('Protected route error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Use protected routes under /api prefix
app.use('/api', protectedRouter);

// Handle React routing in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    if (req.url.startsWith('/auth') || req.url.startsWith('/api')) {
      return next();
    }
    res.redirect('http://localhost:3000');
  });
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tritonfit')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: PORT,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Not set',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
    SESSION_SECRET: process.env.SESSION_SECRET ? 'Set' : 'Not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set'
  });
});