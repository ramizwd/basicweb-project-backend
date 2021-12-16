'use strict';

// Get required files
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { getUserLogin } = require('../models/userModel');

// Using new Strategy to verify the user username and password
passport.use(
    new Strategy(async (username, password, done) => {
        const params = [username];
        try {
            // Get the first matched user from DB
            const [user] = await getUserLogin(params);
            console.log('Local strategy', user);
            // if user isn't found send an error message using done method
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email or password!',
                });
            }
            // compare passwords with bcrypt if doesn't match throw an error
            if (!(await bcrypt.compare(password, user.password))) {
                return done(null, false, {
                    message: 'Incorrect email or password!',
                });
            }
            // delete user password when returning the user and return user without the binary row type
            delete user.password;
            return done(null, { ...user }, { message: 'Logged in successfully' });
        } catch (e) {
            return done(e);
        }
    })
);

// Using passport-jwt strategy, check the validity of the token then allow the requests
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // return the encoded JWT as string or null
            secretOrKey: process.env.JWT_SECRET, // verify the token's signature
        },
        (jwtPayLoad, done) => {
            // Console log and return the decoded JWT payload
            console.log('jwtpayload', jwtPayLoad);
            return done(null, jwtPayLoad);
        }
    )
);

module.exports = passport;
