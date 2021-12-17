'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Get comment votes and voter info
const getCommentVote = async (userId, commentId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT user_id, vote_type, comments_id FROM pjr_comments_vote WHERE user_id = ? AND comments_id = ?',
            [userId, commentId]
        );
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Get user and vote info from body then insert new vote to appropriate comment
const commentVoteInsert = async (user, commentVote, commentId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO pjr_comments_vote (user_id, vote_type, comments_id) VALUES (?,?,?)',
            [user.user_id, commentVote.vote_type, commentId]
        );
        return rows.insertId;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// delete vote from a comment
const deleteCommentVote = async (bodyInfo, commentId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM pjr_comments_vote WHERE user_id = ? AND vote_type = ? AND comments_id = ?',
            [bodyInfo.user_id, bodyInfo.vote_type, commentId]
        );
        console.log('vote deleted');
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating comment"s vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// change vote type if user already have a vote in comment
const commentVoteUpdate = async (commentVote, commentId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE pjr_comments_vote SET vote_type = ? WHERE user_id = ? AND comments_id = ?',
            [commentVote.vote_type, commentVote.user_id, commentId]
        );
        console.log('vote updated');
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating comments vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export functions
module.exports = {
    getCommentVote,
    commentVoteInsert,
    deleteCommentVote,
    commentVoteUpdate,
};
