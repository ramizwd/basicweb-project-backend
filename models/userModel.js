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

// Check role if it's 0 (moderator) use the query that allows any user to be deleted with their votes
// else check user id that's logged in and user's id to be deleted
const deleteUser = async (userId, user_id, role, next) => {
    let sql =
        'DELETE pjr_user, pjr_post_vote FROM pjr_user INNER JOIN pjr_post_vote WHERE pjr_user.user_id = pjr_post_vote.user_id AND pjr_user.user_id = ? AND pjr_user.user_id = ?';
    let params = [userId, user_id];
    if (role === 0) {
        sql =
            'DELETE pjr_user, pjr_post_vote FROM pjr_user INNER JOIN pjr_post_vote WHERE pjr_user.user_id = pjr_post_vote.user_id and pjr_user.user_id = ?;';
        params = [userId];
    }
    try {
        const [rows] = await promisePool.execute(sql, params);
        console.log('model user deleted', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('message', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Update any user and user role if mode role, else update only user's own info without editing role
const updateUser = async (user, user_id, role, next) => {
    let sql =
        'UPDATE pjr_user SET username=?, email=?, password=?, description=? WHERE user_id=? AND user_id=?';
    let params = [
        user.username,
        user.email,
        user.password,
        user.description,
        user.id,
        user_id,
    ];
    if (role === 0) {
        sql =
            'UPDATE pjr_user SET username=?, email=?, password=?, description=?, role=? WHERE user_id=?';
        params = [
            user.username,
            user.email,
            user.password,
            user.description,
            user.role,
            user.id,
        ];
    }
    try {
        const [rows] = await promisePool.execute(sql, params);

        console.log('model updated user', rows);
        return rows.affectedRows === 1;
    } catch (e) {
        console.error('error updating user', e.message);
        const err = httpError('SQL error', 500);
        next(err);
    }
};

// Update user profile in database
const updateUserProfile = async (user, user_id, role, next) => {
    let sql =
        'UPDATE pjr_user SET username=?, profile_picture=?, description=? WHERE user_id=? AND user_id=?';
    let params = [
        user.username,
        user.profile_picture,
        user.description,
        user.id,
        user_id,
    ];
    if (role === 0) {
        sql =
            'UPDATE pjr_user SET username=?, profile_picture=?, description=? WHERE user_id=?';
        params = [
            user.username,
            user.profile_picture,
            user.description,
            user.id,
        ];
    }
    try {
        const [rows] = await promisePool.execute(sql, params);

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
