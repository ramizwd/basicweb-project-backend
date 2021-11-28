'user struct';

const pool = require('../database/db');
const promisePool = pool.promise(); // Promise wrapped instance of the created pool.

// Query for getting all users in the database using an anonymous async function.
const getAllUsers = async () => {
    try {
        // Query database
        const [rows] = await promisePool.query(`SELECT * FROM user`);
        return rows;
    } catch (e) {
        console.error('error', e.message); // Catch and log any errors.
    }
};

const getUser = async (userId) => {
    try {
        const [rows] = await promisePool.execute(
            `SELECT * FROM user WHERE id = ?`,
            [userId]
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

// Export all functions
module.exports = {
    getAllUsers,
    getUser,
};
