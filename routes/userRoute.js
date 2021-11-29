'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const router = express.Router();
const {
    user_get_all,
    user_get,
    user_post,
    delete_user,
    user_update,
} = require('../controllers/userController');

router
    .route('/')
    // Get request to user_get_all using express routing
    .get(user_get_all)
    // Using multer for handling 'multipart/form-data' file uploads and sending Post req to user_post.
    .post(upload.single('user'), user_post)
    // Update user http request method
    .put(user_update);

router
    .route('/:userId')
    .get(user_get) // Get user by id
    .delete(delete_user); // Delete user by id

module.exports = router;
