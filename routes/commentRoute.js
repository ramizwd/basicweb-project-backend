'use strict';

const express = require('express');
const {
    post_comment,
    get_comment,
    update_comment,
    delete_comment,
    get_all_comment,
} = require('../controllers/commentController');

const router = express.Router();

router
    .route('/:postId')
    .post(post_comment)
    .put(update_comment)
    .delete(delete_comment)
    .get(get_all_comment);

// Route for getting specified comment
router.route('/:userId/:postId').get(get_comment);

module.exports = router;
