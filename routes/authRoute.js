'use strict';

const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

// Post request to login from authController
router.post('/login', login);

// Logout
router.get('/logout', logout);

// Export route
module.exports = router;
