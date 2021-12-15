'use strict';

const express = require('express');
const {
    post_comment,
    get_comment,
    update_comment,
    delete_comment,
    get_all_comment,
    get_all_comments_count,
} = require('../controllers/commentController');

const router = express.Router();

router.route('/:postId').post(post_comment).put(update_comment).delete(delete_comment).get(get_all_comment);

router.route('/count/:postId/').get(get_all_comments_count);
// Route for getting specified comment
router.route('/:userId/:postId').get(get_comment);

module.exports = router;
