'use strict';

const express = require('express');

const {
    post_vote,
    update_vote,
    get_vote,
    delete_vote,
} = require('../controllers/voteController');
const router = express.Router();

// Vote routes
router
    .route('/:postId')
    .post(post_vote)
    .put(update_vote)
    .get(get_vote)
    .delete(delete_vote);
// Route for getting user's upvoted post
router.route('/:userId/:postId').get(get_vote);

module.exports = router;
