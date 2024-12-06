import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Debug logging middleware
router.use((req, res, next) => {
  console.log(`Auth Route Hit: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

router.get('/google',
  (req, res, next) => {
    console.log('Starting Google authentication');
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account',
      session: false
    })(req, res, next);
  }
);

router.get('/google/callback',
  (req, res, next) => {
    console.log('Google callback received');
    passport.authenticate('google', { session: false }, (err, user) => {
      if (err) {
        console.error('Auth Error:', err);
        return res.redirect(`${process.env.CLIENT_URL}?error=auth_failed`);
      }
      
      if (!user) {
        console.error('No user returned');
        return res.redirect(`${process.env.CLIENT_URL}?error=no_user`);
      }

      try {
        const token = jwt.sign(
          { 
            userId: user._id,
            isNewUser: !user.isProfileComplete 
          }, 
          process.env.JWT_SECRET!,
          { expiresIn: '7d' }
        );
        if (!user.isProfileComplete) {
          console.log('Temporarily redirect to home:', `${process.env.CLIENT_URL}/home`);
          res.redirect(`${process.env.CLIENT_URL}/home`);
          // console.log('Redirecting to:', `${process.env.CLIENT_URL}/createaccount`);
          //res.redirect(`${process.env.CLIENT_URL}/createaccount`);
        }
        else {
        console.log('Redirecting to:', `${process.env.CLIENT_URL}?token=${token}`);
        //res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
        res.redirect(`${process.env.CLIENT_URL}/home`);
        }
      } catch (error) {
        console.error('Token Error:', error);
        res.redirect(`${process.env.CLIENT_URL}?error=token_error`);
      }
    })(req, res, next);
  }
);

export default router;