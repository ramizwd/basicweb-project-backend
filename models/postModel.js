'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Try connecting to DB then execute the SQL query to selects all post rows with their respective votes and return them in a descending order.
// If there is an error catch it and console log it, also send error message and code to the httpError function
// to display them to the client
const getAllPosts = async (next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post_id, poster, date, title, filename, file_type, pjr_post.description AS description, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp, ' +
                'COUNT(case when vote_count = 1 then 1 end) as Upvote, ' +
                'COUNT(case when vote_count = 0 then 1 end) as Downvote, ' +
                '(COUNT(case when vote_count = 1 then 1 end) - COUNT(case when vote_count = 0 then 1 end)) as Votes FROM pjr_post ' +
                'INNER JOIN pjr_user ON poster = pjr_user.user_id ' +
                'LEFT JOIN pjr_post_vote ON pjr_post.post_id= pjr_post_vote.user_post_id GROUP BY post_id ' +
                'ORDER BY pjr_post.post_id DESC'
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Get Post by ID from database
const getPost = async (postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post_id, poster, date, title, filename, file_type, pjr_post.description AS description, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp, ' +
                'COUNT(case when vote_count = 1 then 1 end) as Upvote, ' +
                'COUNT(case when vote_count = 0 then 1 end) as Downvote, ' +
                '(COUNT(case when vote_count = 1 then 1 end) - COUNT(case when vote_count = 0 then 1 end)) as Votes FROM pjr_post ' +
                'INNER JOIN pjr_user ON poster = pjr_user.user_id ' +
                'LEFT JOIN pjr_post_vote ON pjr_post.post_id= pjr_post_vote.user_post_id WHERE post_id = ?',
            [postId]
        );
        console.log('Get post by id', rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Get logged in user's posts for user's profile
const getUserPosts = async (user, next) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post_id, poster, DATE, title, filename, file_type, pjr_post.description AS description, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp, COUNT( CASE WHEN vote_count = 1 THEN 1 END ) AS Upvote, COUNT( CASE WHEN vote_count = 0 THEN 1 ' +
                'END) AS Downvote,(COUNT(CASE WHEN vote_count = 1 THEN 1 END) - COUNT(CASE WHEN vote_count = 0 THEN 1 END)) AS Votes FROM pjr_post INNER JOIN pjr_user ON poster = pjr_user.user_id LEFT JOIN pjr_post_vote ON pjr_post.post_id = pjr_post_vote.user_post_id WHERE poster = ? GROUP BY post_id ' +
                'ORDER BY pjr_post.post_id DESC',
            [user]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Insert post to database
const insertPost = async (post, next) => {
    try {
        const [rows] = await promisePool.execute(
            `INSERT INTO pjr_post (title, filename, description, poster) VALUES (?,?,?,?)`,
            [post.title, post.filename, post.description, post.poster]
        );

        console.log('Model insert new post', rows);
        return rows.insertId;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Delete post from database
const deletePost = async (postId, next) => {
    try {
        const [rows] = await promisePool.execute(
            `DELETE FROM pjr_post WHERE post_id = ?`,
            [postId]
        );

        console.log('Post deleted', rows);
        return rows.affectedRows === 1; // return true if affected rows equal 1
    } catch (e) {
        console.log('Model delete post');
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export functions
module.exports = {
    getAllPosts,
    getPost,
    insertPost,
    deletePost,
    getUserPosts,
};
