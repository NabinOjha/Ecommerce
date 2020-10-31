const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('./../model/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/users/auth/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return cb(null, existingUser);
      } else {
        const user = {
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id.toString(),
        };
        const newUser = await User.create(user);
        console.log({ newUser });
        return cb(null, newUser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/users/auth/facebook',
      profileFields: ['id', 'displayName', 'email'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        cb(null, existingUser);
      } else {
        const user = {
          username: profile._json.name,
          email: profile._json.email,
          facebookId: profile._json.id,
        };

        const newUser = await User.create(user);
        cb(null, newUser);
      }
    }
  )
);
