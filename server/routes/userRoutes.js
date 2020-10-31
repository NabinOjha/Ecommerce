const express = require('express');
const passport = require('passport');

const authController = require('./../controllers/authController');

const router = express.Router();

//email password signup/login with jwt
router.post('/signup/email', authController.signUp);
router.post('/login/email', authController.login);

router.get('/currentUser', authController.currentUser);

router.get('/logout', authController.logout);

//google sign in with passwortjs
router
  .route('/signup/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/callback').get(
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  function (req, res) {
    res.redirect('http://localhost:3000/dashboard');
  }
);

//facebook signup with passport js
router
  .route('/signup/facebook')
  .get(passport.authenticate('facebook', { scope: ['email'] }));

router.route('/auth/facebook').get(
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/login',
  }),
  function (req, res) {
    res.redirect('http://localhost:3000/dashboard');
  }
);

module.exports = router;

//sweet life
