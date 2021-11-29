'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

// Try connecting to DB then execute the SQL query that selects all user_post rows and return them.
// If there is an error catch it and console log it, also send error message and code to the httpError function
// to display them to the client
const getAllPosts = async (next) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM user_post');
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
            `SELECT * FROM user_post WHERE id = ?`,
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

// Export functions
module.exports = {
    getAllPosts,
    getPost,
};
