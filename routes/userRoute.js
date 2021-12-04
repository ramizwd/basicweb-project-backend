'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    user_get_all,
    user_get,
    user_post,
    delete_user,
    user_update,
    checkToken,
} = require('../controllers/userController');

router.get('/token', checkToken);

router
    .route('/')
    // Get request to user_get_all using express routing
    .get(user_get_all)
    // Multer for handling 'multipart/form-data' file uploads, validate data, then send Post req to user_post.
    .post(
        body('username').isLength({ min: 4 }),
        body('email').isEmail(),
        body('password').matches('(?=.*[A-Z]).{8,}'),
        user_post
    )
    // Update user http request method
    .put(user_update);

router
    .route('/:userId')
    .get(user_get) // Get user by id
    .delete(delete_user); // Delete user by id

module.exports = router;
