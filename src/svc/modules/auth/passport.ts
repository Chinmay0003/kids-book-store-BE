import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreateUser } from '~src/svc/modules/auth/utils/utils';

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = {
      googleId: profile.id,
      email: profile.emails?.[0].value || '',
      name: profile.displayName,
    };

    const savedUser = await findOrCreateUser(user);
    done(null, savedUser);
  })
);
