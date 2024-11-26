import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });

// Validate required environment variables
const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is required`);
  }
});

// Interface for Google Profile
interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: { value: string; verified?: boolean }[];
  photos?: { value: string }[];
  _json: {
    email_verified?: boolean;
    [key: string]: any;
  };
}

// Extended User interface with Mongoose Document methods
interface IUserDocument extends mongoose.Document, IUser {
  isNewUser?: boolean;
}

// Passport type definitions
declare global {
  namespace Express {
    interface User extends IUserDocument {}
  }
}

// Updated serialize/deserialize functions
passport.serializeUser((user: IUserDocument, done) => {
  try {
    console.log('Serializing user:', user._id);
    done(null, user._id);
  } catch (error) {
    console.error('Error serializing user:', error);
    done(error, null);
  }
});

passport.deserializeUser(async (id: string, done) => {
  try {
    console.log('Deserializing user:', id);
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.API_URL || 'http://localhost:5001'}/auth/google/callback`,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile: GoogleProfile, done) => {
      console.log('Google strategy callback triggered');
      
      try {
        if (!profile.emails?.[0]?.value) {
          return done(new Error('No email provided by Google'), undefined);
        }

        const email = profile.emails[0].value;
        
        // First try to find user by Google ID
        let user = await User.findOne({ googleId: profile.id });
        
        // If no user found by Google ID, try to find by email
        if (!user) {
          user = await User.findOne({ email });
        }

        if (user) {
          console.log('Existing user found:', user._id);
          
          // Update Google ID if not set
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }

          // Update profile picture if changed
          if (profile.photos?.[0]?.value && user.picture !== profile.photos[0].value) {
            user.picture = profile.photos[0].value;
            await user.save();
          }

          (user as IUserDocument).isNewUser = false;
          return done(null, user);
        }

        console.log('Creating new user...');
        const newUser = await User.create({
          googleId: profile.id,
          email: email,
          name: profile.displayName,
          picture: profile.photos?.[0]?.value,
          isProfileComplete: false,
          emailVerified: profile._json.email_verified || false,
          createdAt: new Date(),
          lastLogin: new Date()
        });

        // Add isNewUser property
        (newUser as IUserDocument).isNewUser = true;
        console.log('New user created:', newUser._id);
        
        done(null, newUser);
      } catch (error) {
        console.error('Error in Google strategy:', error);
        if (error instanceof Error) {
          done(error, undefined);
        } else {
          done(new Error('Unknown error occurred'), undefined);
        }
      }
    }
  )
);

export default passport;