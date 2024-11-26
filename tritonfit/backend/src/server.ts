import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth';
//import './config/passport';
import RecentWorkoutRouter from './routes/recentWorkoutRoutes';
import SavedWorkoutRouter from './routes/savedWorkoutRoutes';
import UserRouter from './routes/userRoutes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// More detailed CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(passport.initialize());

// Update the auth routes to include the base path
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tritonfit')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Client URL:', process.env.CLIENT_URL);
  console.log('Server URL:', process.env.SERVER_URL);
});

app.use('/recentWorkouts', RecentWorkoutRouter);
app.use('/savedWorkouts', SavedWorkoutRouter);
app.use('/user', UserRouter);