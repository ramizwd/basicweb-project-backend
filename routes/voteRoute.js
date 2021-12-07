'use strict';

const express = require('express');

const { post_vote, update_vote } = require('../controllers/voteController');
const router = express.Router();

// Vote routes
router.route('/:postId').post(post_vote).put(update_vote);

module.exports = router;
