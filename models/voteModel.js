'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Get vote and voter info
const getVote = async (userId, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT user_id, vote_count, user_post_id FROM pjr_post_vote WHERE user_id = ? AND user_post_id = ?',
            [userId, postId]
        );
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Get user id, vote type, and post id, then insert a new vote to the post
const voteInsert = async (user, vote, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO pjr_post_vote(user_id, vote_count, user_post_id) VALUES (?,?,?)',
            [user.user_id, vote.vote_count, postId]
        );
        return rows.insertId;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// update vote if user want to change vote type
const voteUpdate = async (vote, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'UPDATE pjr_post_vote SET vote_count = ? WHERE user_id = ? AND user_post_id = ?',
            [vote.vote_count, vote.user_id, postId]
        );
        console.log('vote updated');
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Delete user's voted vote
const deleteVote = async (bodyInfo, postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM `pjr_post_vote` WHERE user_id = ? AND vote_count = ? AND user_post_id = ?',
            [bodyInfo.user_id, bodyInfo.vote_count, postId]
        );
        console.log('vote deleted');
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating vote', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export functions
module.exports = {
    voteInsert,
    voteUpdate,
    getVote,
    deleteVote,
};
