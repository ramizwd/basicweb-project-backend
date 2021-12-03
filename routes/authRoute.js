'use strict';

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Post request to login from authController
router.post('/login', login);

// Export route
module.exports = router;
