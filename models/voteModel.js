'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Get user id, vote type, and post id, then insert a new vote to the post
const voteInsert = async (vote, user, postId, next) => {
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
const voteUpdate = async (body, postId, next) => {
    try {
        const [rows] = await promisePool.pool.execute(
            'UPDATE pjr_post_vote SET vote_count = ? WHERE user_id = ? AND user_post_id = ?',
            [body.vote_count, body.user_id, postId]
        );
        console.log('vote updated');
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
};
