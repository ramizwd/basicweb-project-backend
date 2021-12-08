'user struct';

const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise(); // Promise wrapped instance of the created pool.

// Query for getting all users in the database using an anonymous async function.
const getAllUsers = async (next) => {
    try {
        // Query database
        const [rows] = await promisePool.execute(`SELECT * FROM pjr_user`);
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
            `SELECT * FROM pjr_user WHERE user_id = ?`,
            [userId]
        );
        return rows[0];
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
            `INSERT INTO pjr_user (username, email, password) VALUES (?,?,?)`,
            [user.username, user.email, user.password]
        );

        console.log('model insert user', rows);
        return rows.insertId;
    } catch (e) {
        console.error('model insert user', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Delete user from database
const deleteUser = async (userId, next) => {
    try {
        const [rows] = await promisePool.execute(
            `DELETE FROM pjr_user WHERE user_id = ?`,
            [userId]
        );

        console.log('model user deleted', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('message', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Update user in database
const updateUser = async (user, next) => {
    try {
        const [rows] = await promisePool.execute(
            `UPDATE pjr_user SET username=?, email=?, password=?, description=?, role=? WHERE user_id=?`,
            [
                user.username,
                user.email,
                user.password,
                user.description,
                user.role,
                user.id,
            ]
        );

        console.log('model updated user', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating user', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Update user profile in database
const updateUserProfile = async (user, next) => {
    try {
        const [rows] = await promisePool.execute(
            `UPDATE pjr_user SET username=?, description=? WHERE user_id=?`,
            [user.username, user.description, user.id]
        );

        console.log('model updated user', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating user', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Return user with the specified email from the DB or catch any errors
const getUserLogin = async (params) => {
    try {
        console.log(params);
        const [rows] = await promisePool.execute(
            'SELECT * FROM pjr_user WHERE email=?;',
            params
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

// Export all functions
module.exports = {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    getUserLogin,
    updateUserProfile,
};
