import express from 'express';
import { AuthRequest } from '../middleware/verify';
import User from '../models/User';

const router = express.Router();

// Get current user data
router.get('/me', async (req: AuthRequest, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Fetch fresh user data from database
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user profile data by specific fields
router.get('/profile', async (req: AuthRequest, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const fields = req.query.fields ? (req.query.fields as string).split(',') : [];
    const selectFields = fields.length > 0 ? fields.join(' ') : '-password';

    const user = await User.findById(req.user._id).select(selectFields);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;