'use strict';

const express = require('express');
const router = express.Router();
const {login, logout, user_post} = require('../controllers/authController');
const {body} = require('express-validator');

// Post request to login from authController
router.post('/login', login);

// Logout
router.get('/logout', logout);

// Register

// Multer for handling 'multipart/form-data' file uploads, validate data, then send Post req to user_post.
router.post(
'/register',
body('username').isLength({min: 4}),
body('email').isEmail(),
body('password').matches('(?=.*[A-Z]).{8,}'),
user_post,
);
// Export route
module.exports = router;
