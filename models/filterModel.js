'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

// Try connecting to DB then execute the SQL query to selects all post rows with their respective votes and return them filtered item
// If there is an error catch it and console log it, also send error message and code to the httpError function
// to display them to the client
const filterAll = async (filtered,next) => {
    console.log(filtered);
    try {
        const [rows] = await promisePool.execute(
        `SELECT post_id, poster, date, title, filename, file_type, pjr_post.description AS description, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp, ` +
        `COUNT(case when vote_count = 1 then 1 end) as upvote, ` +
        `COUNT(case when vote_count = 0 then 1 end) as downvote, ` +
        `(COUNT(case when vote_count = 1 then 1 end) - COUNT(case when vote_count = 0 then 1 end)) as votes FROM pjr_post ` +
        `INNER JOIN pjr_user ON poster = pjr_user.user_id ` +
        `LEFT JOIN pjr_post_vote ON pjr_post.post_id= pjr_post_vote.user_post_id GROUP BY post_id ` +
        `ORDER BY ${filtered}`);
        console.log([rows]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export functions
module.exports = {
 filterAll
};