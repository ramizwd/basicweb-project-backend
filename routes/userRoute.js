'use strict';

const express = require('express');
const router = express.Router();
const { user_get_all, user_get } = require('../controllers/userController');

router.route('/').get(user_get_all); // Get request to user_get_all using express routing

router.route('/:userId').get(user_get); // Get user by id

module.exports = router;
