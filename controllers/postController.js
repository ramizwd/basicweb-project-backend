'use strict';

const { validationResult } = require('express-validator');
const {
    getAllPosts,
    getPost,
    insertPost,
    deletePost,
} = require('../models/postModel');
const { httpError } = require('../utils/errors');

// Return a JSON array of the Posts if there is any otherwise send an error message
// with status code to the client
const post_get_all = async (req, res, next) => {
    const posts = await getAllPosts(next);
    console.log('get all posts', posts);

    if (posts.length > 0) {
        res.json(posts);
        return;
    }

    const err = httpError('posts not found', 404);
    next(err);
};

// Get post ID from route parameter and get post from DB. if post exist then send it to the client as JSON
// else send and error message and code to 'httpError' and return it.
const post_get = async (req, res, next) => {
    const postById = await getPost(req.params.postId, next);
    console.log('get post by id', postById);

    if (postById) {
        res.json(postById);
        return;
    }

    const err = httpError('cat not found', 404);
    next(err);
};

// Insert new post to DB.
const post_insert = async (req, res, next) => {
    console.log('post added', req.body, req.user);
    console.log('post added', req.file);

    const post = req.body;
    post.filename = req.file.filename;

    // Check file, if not found send error message and code.
    if (!req.file) {
        const err = httpError('File not found', 400);
        next(err);
        return;
    }

    // Get the validation errors from the request and return it as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Post validation', errors.array());
        const err = httpError('Data not valid', 400);
        next(err);
        return;
    }

    post.message = `post added with ID: ${await insertPost(post, next)}`;
    res.json(post);
};

// Delete post from DB
const post_delete = async (req, res, next) => {
    const deleted = await deletePost(req.params.postId, next);
    res.json({ message: `Post deleted: ${deleted}` });
};

// Export functions
module.exports = {
    post_get_all,
    post_get,
    post_insert,
    post_delete,
};
