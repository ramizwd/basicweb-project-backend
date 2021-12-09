'use strict';

const { validationResult } = require('express-validator');
const {
    getAllUsers,
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    updateUserProfile,
} = require('../models/userModel');
const { httpError } = require('../utils/errors');

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
    const errors = validationResult(req);

    // Get the validation errors from the request and return it as an array
    if (!errors.isEmpty()) {
        console.error('Post validation', errors.array());
        const err = httpError('Data not valid', 400);
        next(err);
        return;
    }
    user.message = `user added with id: ${await insertUser(user, next)}`;
    res.json(user);
};

// Get user Id from route parameter same with user info and send it to deleteUser
const delete_user = async (req, res, next) => {
    const deleted = await deleteUser(
        req.params.userId,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `User deleted: ${deleted}` });
};

// Get user and send them to updateUser function
const user_update = async (req, res, next) => {
    const updated = await updateUser(
        req.body,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `User Updated: ${updated}` });
};

// Get user and send their info to updateUserProfile
const user_update_profile = async (req, res, next) => {
    const updated = await updateUserProfile(
        req.body,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `User profile Updated: ${updated}` });
};

// Check token
const checkToken = (req, res, next) => {
    if (!req.user) {
        next(new Error('token not valid'));
    } else {
        res.json({ user: req.user });
    }
};

// Export functions
module.exports = {
    user_get_all,
    user_get,
    user_post,
    delete_user,
    user_update,
    checkToken,
    user_update_profile,
};
