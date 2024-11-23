import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const router = express.Router();

// Extend the Express Request type to include our user
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

// Add more detailed logging to Google auth route
router.get('/google',
  (req, res, next) => {
    console.log('Starting Google authentication...');
    console.log('Session:', req.session);
    console.log('Headers:', req.headers);
    
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account', // Always show account selector
      failureRedirect: `${process.env.CLIENT_URL}/signin`,
      session: false // Make sure session is false if not using sessions
    })(req, res, next);
  }
);

// Add more detailed logging to callback route
router.get('/google/callback',
  (req, res, next) => {
    console.log('Received callback from Google');
    console.log('Query params:', req.query);
    console.log('Session:', req.session);
    
    passport.authenticate('google', { session: false }, (err, user, info) => {
      console.log('Inside passport.authenticate callback');
      console.log('Error:', err);
      console.log('User:', user);
      console.log('Info:', info);
      
      if (err) {
        console.error('Authentication error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }
      
      if (!user) {
        console.error('No user returned from Google');
        console.error('Auth Info:', info);
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }

      try {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
          expiresIn: '7d'
        });

        console.log('Authentication successful, redirecting to client...');
        console.log('Generated token (first 20 chars):', token.substring(0, 20));
        
        const redirectUrl = `${process.env.CLIENT_URL}/auth-callback?token=${token}`;
        console.log('Redirecting to:', redirectUrl);
        
        res.redirect(redirectUrl);
      } catch (error) {
        console.error('Error generating token:', error);
        res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }
    })(req, res, next);
  }
);

// User info route with more logging
router.get('/user', 
  async (req, res) => {
    console.log('User info request received');
    console.log('Auth header:', req.headers.authorization);
    
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        console.log('No token provided in request');
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      console.log('Decoded token:', decoded);
      
      const user = await User.findById(decoded.userId).select('-__v');
      console.log('Found user:', user ? 'yes' : 'no');
      
      if (!user) {
        console.log('User not found in database');
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