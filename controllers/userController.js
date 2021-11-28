'use strict';

const {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
} = require('../models/userModel');

// Get all users from the database and send them in a JSON formatted response.
const user_get_all = async (req, res, next) => {
    const users = await getAllUsers(next);
    console.log('all users', users);
    res.json(users);
};

// Get user by id from DB
const user_get = async (req, res, next) => {
    const user = await getUser(req.params.userId, next);
    console.log('get user by id', user);
    res.json(user);
};

// Get user from the client side and inserting the new user to DB
const user_post = async (req, res, next) => {
    console.log('added user data', req.body);
    const user = req.body;
    user.message = `user added with id: ${await insertUser(user, next)}`;
    res.json(user);
};

// Get user Id from route parameter and send it to deleteUser
const delete_user = async (req, res, next) => {
    const deleted = await deleteUser(req.params.userId, next);
    res.json({ message: `User deleted: ${deleted}` });
};

// Export functions
module.exports = {
    user_get_all,
    user_get,
    user_post,
    delete_user,
};
