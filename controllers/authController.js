'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const {httpError} = require('../utils/errors');
const {validationResult} = require('express-validator');
const {insertUser} = require('../models/userModel');

// Calling passport authentication function with local strategy and error handling
const login = (req, res, next) => {
    // Passport auth. session to false, so the user won't be saved in the session
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('local params', err, user, info);
        // If err true or no user found then send and error message and code
        if (err || !user) {
            next(httpError('email or password incorrect', 400));
            return;
        }
        req.login(user, {session: false}, (err) => {
            // If there is an error send and error message and code
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            // Create and return a signed JWT with the contents of user object
            // for IDing the user
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })(req, res, next);
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
// logout
const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

// Export the function
module.exports = {
    login,
    logout,
    user_post,
};
