'use strict';

const { getAllUsers, getUser } = require('../models/userModel');

// Get all users from the database and send them in a JSON formatted response.
const user_get_all = async (req, res) => {
    const users = await getAllUsers();
    console.log('all users', users);
    res.json(users);
};

// Get user by id from DB
const user_get = async (req, res) => {
    const user = await getUser(req.params.userId);
    console.log('get user by id', user);
    res.json(user);
};

// Export functions
module.exports = {
    user_get_all,
    user_get,
};
