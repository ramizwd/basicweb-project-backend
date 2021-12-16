'use strict';

const express = require('express');
const {
    get_comment_vote,
    post_comment_vote,
    delete_comment_vote,
    update_comment_vote,
} = require('../controllers/commentVoteController');
const router = express.Router();

// Request methods for comment's votes
router
    .route('/:commentId')
    .post(post_comment_vote)
    .delete(delete_comment_vote)
    .put(update_comment_vote);
// Route for getting user's voted comment
router.route('/:userId/:commentId').get(get_comment_vote);

module.exports = router;
