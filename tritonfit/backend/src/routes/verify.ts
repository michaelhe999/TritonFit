import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUserModel } from '../models/User';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Ensure JWT_SECRET is available
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

// Define the structure of our JWT payload
interface JWTPayload {
  userId: string;
  isNewUser?: boolean;
  iat?: number;
  exp?: number;
}

// Extended request interface with auth properties
export interface AuthRequest extends Request {
  token?: string;
  user?: IUserModel;
}

// Custom error for authentication failures
class AuthError extends Error {
  status: number;
  
  constructor(message: string, status: number = 401) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthError('No authorization header found');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new AuthError('Invalid authorization format');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AuthError('No token provided');
    }

    // Verify the token
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be defined in environment variables');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as JWTPayload;
      
      // Fetch the complete user data from database
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new AuthError('User not found', 404);
      }

      // Attach user and token to request
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthError('Invalid or expired token');
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error instanceof AuthError) {
      return res.status(error.status).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Optional: Helper function to create a protected route handler
type RouteHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;

export const createProtectedRoute = (handler: RouteHandler): RouteHandler => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error('Protected route error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

// Helper function to check if user has completed profile
export const requireCompleteProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.isProfileComplete) {
      return res.status(403).json({
        success: false,
        message: 'Profile completion required'
      });
    }
    next();
  } catch (error) {
    console.error('Profile check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};