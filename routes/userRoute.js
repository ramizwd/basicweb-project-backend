'use strict';

const express = require('express');
const router = express.Router();
const { user_get_all } = require('../controllers/userController');

router.route('/').get(user_get_all);

module.exports = router;
