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
    console.log('\n[Google Auth] Starting Google authentication flow');
    console.log('[Google Auth] Headers:', JSON.stringify(req.headers, null, 2));
    console.log('[Google Auth] Session:', JSON.stringify(req.session, null, 2));
    
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account', // Always show account selector
      failureRedirect: `${process.env.CLIENT_URL}/signin`,
      session: false // Make sure session is false if not using sessions
    })(req, res, next);
  }
);

router.get('/google/callback',
  (req, res, next) => {
    console.log('Received callback from Google');
    console.log('Query params:', req.query);
    
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err) {
        console.error('Authentication error:', err);
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }
      
      if (!user) {
        console.error('No user returned from Google');
        return res.redirect(`${process.env.CLIENT_URL}/auth-error`);
      }

      try {
        // Get isNewUser from temporary property
        const isNewUser = user.get('isNewUser');
        
        const token = jwt.sign({ 
          userId: user._id,
          isNewUser: isNewUser 
        }, process.env.JWT_SECRET!, {
          expiresIn: '7d'
        });

        console.log('Authentication successful, redirecting to client...');
        // Always redirect through auth-callback
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
    console.log('\n[User Info] Request received');
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

      // Check if profile is complete and send that info
      const isProfileComplete = user.isProfileComplete || false;
      res.json({
        ...user.toJSON(),
        isProfileComplete
      });
    } catch (error) {
      console.error('[User Info] Error:', error);
      res.status(401).json({ message: 'Invalid token' });
    }
  }
);

export default router;