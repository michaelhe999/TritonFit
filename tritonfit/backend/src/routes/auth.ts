import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const router = express.Router();

// Extend the Express Request type to include our user
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

// Add error handling and logging to Google auth route
router.get('/google',
  (req, res, next) => {
    console.log('Starting Google authentication...');
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account' // Always show account selector
    })(req, res, next);
  }
);

// Add error handling and logging to callback route
router.get('/google/callback',
  (req, res, next) => {
    console.log('Received callback from Google');
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err) {
        console.error('Authentication error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }
      
      if (!user) {
        console.error('No user returned from Google');
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '7d'
      });

      console.log('Authentication successful, redirecting to client...');
      res.redirect(`${process.env.CLIENT_URL}/home?token=${token}`);
      //res.redirect(`${process.env.CLIENT_URL}/auth-callback?token=${token}`);
    })(req, res, next);
  }
);

// User info route
router.get('/user', 
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      const user = await User.findById(decoded.userId).select('-__v');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error in /user route:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }
);

export default router;