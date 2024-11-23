import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

passport.serializeUser((user: any, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log('Deserializing user:', id);
  try {
    const user = await User.findById(id);
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
      callbackURL: `http://localhost:5001/auth/google/callback`,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google strategy callback triggered');
      console.log('Profile:', profile);
      
      try {
        console.log('Looking for existing user...');
        const existingUser = await User.findOne({ googleId: profile.id });
        
        if (existingUser) {
          console.log('Existing user found:', existingUser.id);
          return done(null, existingUser);
        }

        console.log('Creating new user...');
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails![0].value,
          name: profile.displayName,
          picture: profile.photos![0].value
        });

        console.log('New user created:', newUser.id);
        done(null, newUser);
      } catch (error) {
        console.error('Error in Google strategy:', error);
        done(error as Error, undefined);
      }
    }
  )
);

export default passport;