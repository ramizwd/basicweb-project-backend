'use strict';

const { getAllPosts, getPost, insertPost } = require('../models/postModel');
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
    const post = req.body;
    post.message = `post added with ID: ${await insertPost(post, next)}`;
    res.json(post);
};

// Export functions
module.exports = {
    post_get_all,
    post_get,
    post_insert,
};
