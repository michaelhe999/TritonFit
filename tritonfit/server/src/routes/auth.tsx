import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

// Extend the Express Request type to include our user
declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user?._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });
    
    res.redirect(`${process.env.CLIENT_URL}/auth-callback?token=${token}`);
  }
);

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
      res.status(401).json({ message: 'Invalid token' });
    }
  }
);

export default router;