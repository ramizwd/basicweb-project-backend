'use strict';

const { validationResult } = require('express-validator');
const {
    getAllPosts,
    getPost,
    insertPost,
    deletePost,
    getUserPosts,
    searchPost,
} = require('../models/postModel');
const { httpError } = require('../utils/errors');
const { makeThumbnail } = require('../utils/resize');

// Return a JSON array of the Posts if there is any otherwise send an error message
// with status code to the client
const post_get_all = async (req, res, next) => {
    const posts = await getAllPosts(next);
    console.log('get all posts', posts);
    res.json(posts);

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

    const err = httpError('post not found', 404);
    next(err);
};

// Get parameter and send it to getUserPosts
const get_user_posts = async (req, res, next) => {
    const userPosts = await getUserPosts(req.params.userId, next);
    console.log('get all user posts', userPosts);
    res.json(userPosts);
};

// Insert new post to DB.
const post_insert = async (req, res, next) => {
    console.log('post added', req.body, req.user);
    console.log('post added', req.file);

    const post = req.body;
    const user = req.user;
    post.filename = req.file.filename;
    post.poster = req.user.user_id;

    // Check file, if not found send error message and code.
    if (!req.file) {
        const err = httpError('File not found', 400);
        next(err);
        return;
    }

    //to recognize if file is img or type
    post.type = req.file.mimetype;
    //to make thumbnail
    if (
        post.type === 'image/png' ||
        post.type === 'image/jpg' ||
        post.type === 'image/webp' ||
        post.type === 'image/jpeg'
    ) {
        await makeThumbnail(req.file.path, req.file.filename);
    }
    // Get the validation errors from the request and return it as an array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Post validation', errors.array());
        const err = httpError('Data not valid', 400);
        next(err);
        return;
    }

    post.message = `post added with ID: ${await insertPost(post, user, next)}`;
    res.json(post);
};

// Get post id from parameter and user info from the request
// then send them to deletePost and delete them from DB
const post_delete = async (req, res, next) => {
    const deleted = await deletePost(
        req.params.postId,
        req.user.user_id,
        req.user.role,
        next
    );
    res.json({ message: `Post deleted: ${deleted}` });
};

// Send params to model
const search_post = async (req, res, next) => {
    const search = await searchPost(req.params.key, next);
    res.json(search);
};

// Export functions
module.exports = {
    post_get_all,
    post_get,
    post_insert,
    post_delete,
    get_user_posts,
    search_post,
};
