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
        console.error('error', e.message); // Catch and log eny errors.
    }
};

// Export all functions
module.exports = {
    getAllUsers,
};
