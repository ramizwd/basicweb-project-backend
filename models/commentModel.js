'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Get all comments associated with a certain post
const getAllComment = async (postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM pjr_comments WHERE pjr_comments.user_post_id = ?',
            [postId]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Get a comment posted by a user
const getComment = async (userId, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT user_id, comment, user_post_id FROM pjr_comments WHERE user_id = ? AND user_post_id = ?',
            [userId, postId]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Insert a comment to DB
const insertComment = async (user, comment, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO pjr_comments (user_id, comment, user_post_id) VALUES (?,?,?)',
            [user.user_id, comment.comment, postId]
        );
        return rows.insertId;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Update a comment
const commentUpdate = async (comment, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE pjr_comments SET comment = ? WHERE user_id = ? AND comments_id = ? AND user_post_id = ?',
            [comment.comment, comment.user_id, comment.comments_id, postId]
        );
        console.log('comment updated');
        return rows.affectedRows == 1;
    } catch (e) {
        console.error('error updating vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Delete comment
const deleteComment = async (commentBody, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM pjr_comments WHERE user_id = ? AND comments_id = ? AND user_post_id = ?',
            [commentBody.user_id, commentBody.comments_id, postId]
        );
        console.log('comment deleted');
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export functions
module.exports = {
    getComment,
    insertComment,
    commentUpdate,
    deleteComment,
    getAllComment,
};
