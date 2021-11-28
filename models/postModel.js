'use strict';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

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

module.exports = {
    getAllPosts,
};
