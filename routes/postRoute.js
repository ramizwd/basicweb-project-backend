'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const {
    post_get_all,
    post_get,
    post_insert,
    post_delete,
} = require('../controllers/postController');
const router = express.Router();

router
    .route('/')
    .get(post_get_all) // Get request for getting all posts
    .post(post_insert); // Post request for posting new post

router
    .route('/:postId')
    .get(post_get) // Get post by id request
    .delete(post_delete); // Delete request

module.exports = router;
