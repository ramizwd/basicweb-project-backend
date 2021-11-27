'use strict';

const { getAllUsers } = require('../models/userModel');

// Get all users from the database and send them in a JSON formatted response.
const user_get_all = async (req, res) => {
    const users = await getAllUsers();
    console.log('all users', users);
    res.json(users);
};

// Export functions
module.exports = {
    user_get_all,
};
