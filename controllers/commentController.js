'use strict';

const {
    getComment,
    insertComment,
    commentUpdate,
    deleteComment,
    getAllComment,
} = require('../models/commentModel');

// Send post id to getAllComment
const get_all_comment = async (req, res, next) => {
    const comments = await getAllComment(req.params.postId, next);
    res.json(comments);
};

// Send user id and post id from parameter to getComment
const get_comment = async (req, res, next) => {
    const comments = await getComment(
        req.params.userId,
        req.params.postId,
        next
    );
    res.json(comments);
};

// Insert comment with user's and comment's info
const post_comment = async (req, res, next) => {
    const user = req.body;
    const comment = req.body;
    comment.message = `comment added to post with ID: ${await insertComment(
        user,
        comment,
        req.params.postId,
        next
    )}`;
    res.json(comment);
};

// Update comment
const update_comment = async (req, res, next) => {
    const commentBody = req.body;
    const comment = await commentUpdate(commentBody, req.params.postId, next);
    res.json({ message: `Comment updated ${comment}` });
};

// Delete comment
const delete_comment = async (req, res, next) => {
    const commentBody = req.body;
    const deleted = await deleteComment(commentBody, req.params.postId, next);
    res.json({ message: `Comment deleted ${deleted}` });
};

// Exports functions
module.exports = {
    get_comment,
    post_comment,
    update_comment,
    delete_comment,
    get_all_comment,
};
