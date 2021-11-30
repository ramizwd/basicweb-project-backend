'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Try connecting to DB then execute the SQL query that selects all user_post rows and return them.
// If there is an error catch it and console log it, also send error message and code to the httpError function
// to display them to the client
const getAllPosts = async (next) => {
    try {
        const [rows] = await promisePool.query(
            `SELECT post_id, poster, date, pjr_post.title AS title, filename, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp FROM pjr_post INNER JOIN pjr_user ON poster = user_id`
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
            `SELECT post_id, poster, date, pjr_post.title AS title, filename, pjr_user.username AS postername, pjr_user.profile_picture AS userpfp FROM pjr_post INNER JOIN pjr_user ON poster = user_id WHERE post_id = ?`,
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

// Insert post to database
const insertPost = async (post, next) => {
    try {
        const [rows] = await promisePool.execute(
            `INSERT INTO pjr_post (date, title, filename, description, poster) VALUES (?,?,?,?,?)`,
            [
                post.date,
                post.title,
                post.filename,
                post.description,
                post.poster,
            ]
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
            `DELETE FROM prj_post WHERE post_id = ?`,
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
};
