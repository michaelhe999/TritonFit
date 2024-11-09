import request from 'supertest';
import passport from 'passport';
import express, { Application } from 'express';
import session from 'express-session';
import passportMockStrategy from 'passport-mock-strategy'; // Ensure correct import

import authRoutes from '../routes/auth';

describe('Google OAuth Flow', () => {
  let app: Application;

  // Reset environment variables before each test
  beforeAll(() => {
    // Mock the CLIENT_URL for testing redirection
    process.env.CLIENT_URL = 'http://localhost:3000';
  });

  // Set up the Express app with the necessary middleware
  beforeEach(() => {
    app = express();

    app.use(session({ secret: 'test-secret', resave: false, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Configure the Mock Strategy for testing Google OAuth
    passport.use(
      new passportMockStrategy(
        {
          name: 'google',
          user: {
            id: '123',
            displayName: 'Test User',
            emails: [{ value: 'testuser@example.com', type: 'work' }],
            name: { familyName: 'User', givenName: 'Test' },
            provider: 'google',
          },
        },
        (user: any, done: any) => done(null, user)
      )
    );

    // Set up the routes
    app.use('/auth', authRoutes);
  });

  it('should redirect to the client with a token on successful authentication', async () => {
    const response = await request(app)
      .get('/auth/google') // Trigger the Google OAuth route
      .set('Accept', 'application/json');

    expect(response.status).toBe(302); // Expect redirection
    expect(response.headers.location).toMatch(/^http:\/\/localhost:3000\/auth-callback\?token=/);
  });
});
