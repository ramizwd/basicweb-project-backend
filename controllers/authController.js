'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const { httpError } = require('../utils/errors');

const login = (req, res, next) => {
    // Passport auth
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            next(httpError('username or passport incorrect', 400));
            return;
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                next(httpError('login error', 400));
                return;
            }
            const toke = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res, next);
};

module.exports = {
    login,
};
