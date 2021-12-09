'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    user_get_all,
    user_get,
    delete_user,
    user_update,
    checkToken,
    user_update_profile,
} = require('../controllers/userController');

router.get('/token', checkToken);

router
    .route('/')
    // Get request to user_get_all using express routing
    .get(user_get_all)

    // Update user http request method
    .put(user_update);

router
    .route('/:userId')
    .get(user_get) // Get user by id
    .delete(delete_user); // Delete user by id

// Edit user profile route
router.route('/profile').put(user_update_profile);

module.exports = router;
