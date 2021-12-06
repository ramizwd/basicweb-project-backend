'use strict';

const express = require('express');

const { post_vote } = require('../controllers/voteController');
const router = express.Router();

router.route('/:postId').post(post_vote);

module.exports = router;
