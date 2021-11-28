'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const { post_get_all } = require('../controllers/postController');
const router = express.Router();

router.route('/').get(post_get_all);

module.exports = router;
