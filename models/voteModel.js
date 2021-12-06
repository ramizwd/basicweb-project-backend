'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

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

module.exports = {
    voteInsert,
};
