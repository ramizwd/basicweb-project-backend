'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const { post_get_all, post_get } = require('../controllers/postController');
const router = express.Router();

router.route('/').get(post_get_all); // Get request for getting all posts

router.route('/:postId').get(post_get); // Get post by id request

module.exports = router;
