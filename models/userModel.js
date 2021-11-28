'user struct';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise(); // Promise wrapped instance of the created pool.

// Query for getting all users in the database using an anonymous async function.
const getAllUsers = async (next) => {
    try {
        // Query database
        const [rows] = await promisePool.query(`SELECT * FROM user`);
        return rows;
    } catch (e) {
        console.error('error', e.message); // Catch and log any errors.
        const err = httpError('SQL error', 500); // Catch SQL errors and send message and error code to httpError function
        next(err);
    }
};

// Get user by id from database.
const getUser = async (userId, next) => {
    try {
        const [rows] = await promisePool.execute(
            `SELECT * FROM user WHERE id = ?`,
            [userId]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Insert new user to database.
const insertUser = async (user, next) => {
    try {
        const [rows] = await promisePool.execute(
            `INSERT INTO user (id, username, email, password, description, role) VALUES (?,?,?,?,?,?)`,
            [
                user.id,
                user.username,
                user.email,
                user.password,
                user.description,
                user.role,
            ]
        );

        console.log('model insert user', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model insert user', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Export all functions
module.exports = {
    getAllUsers,
    getUser,
    insertUser,
};
