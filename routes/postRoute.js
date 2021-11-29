'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const {
    post_get_all,
    post_get,
    post_insert,
} = require('../controllers/postController');
const router = express.Router();

router
    .route('/')
    // Get request for getting all posts
    .get(post_get_all)
    // Post request for posting new post
    .post(post_insert);

router.route('/:postId').get(post_get); // Get post by id request

module.exports = router;
