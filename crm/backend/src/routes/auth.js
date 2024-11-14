const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const authController = require('../controllers/authController');

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    authController.googleCallback
);

module.exports = router;
