'use strict';

const { getAllPosts } = require('../models/postModel');
const { httpError } = require('../utils/errors');

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

module.exports = {
    post_get_all,
};
