'use strict';

// required files
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const users = require('./routes/userRoute');
const posts = require('./routes/postRoute');
const postsAnon = require('./routes/postRoute');
const usersAnon = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const votes = require('./routes/voteRoute');
const comments = require('./routes/commentRoute');
const { httpError } = require('./utils/errors');
const passport = require('./utils/pass');
const app = express();
const port = 3000;

// Check if code in production or localhost in .env file
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
    require('./utils/production')(app, port);
} else {
    require('./utils/localhost')(app, 8000, port);
}

// allowing request from other origins/URLs
app.use(cors());
app.use(passport.initialize());

// Middleware for PUT AND POST request for recognizing JSON Objects and strings.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User, Post, Vote, and Comment routes with passport auth middleware
app.use('/auth', authRoute);
app.use('/user/anon', usersAnon);
app.use('/user', passport.authenticate('jwt', { session: false }), users);
app.use('/post/anon', postsAnon);
app.use('/post', passport.authenticate('jwt', { session: false }), posts);

app.use('/vote', votes);
app.use('/comment', comments);

// Route for uploads and thumbnails
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

// route not found - error handling
app.use((req, res, next) => {
    const err = httpError('Not found', 400);
    next(err);
});

// Error handler. If there is no status error message, send internal server error.
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message || 'internal error');
});
