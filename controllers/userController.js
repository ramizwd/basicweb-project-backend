'use strict';

const { getAllUsers, getUser, deleteUser, updateUser, updateUserProfile } = require('../models/userModel');
const { httpError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

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

// Get user Id from route parameter same with user info and send it to deleteUser
const delete_user = async (req, res, next) => {
    const deleted = await deleteUser(req.params.userId, req.user.user_id, req.user.role, next);
    res.json({ message: `User deleted: ${deleted}` });
};

// Get user and send them to updateUser function
const user_update = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 12);
    const updated = await updateUser(req.body, req.user.user_id, req.user.role, next);
    res.json({ message: `User Updated: ${updated}` });
};

// Get user and send their info to updateUserProfile
const user_update_profile = async (req, res, next) => {
    const user = req.body;
    user.profile_picture = req.file.filename;
    console.log(user);
    console.log(req.file);
    const updated = await updateUserProfile(user, req.params.userId, req.user.role, next);
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
    delete_user,
    user_update,
    checkToken,
    user_update_profile,
};
