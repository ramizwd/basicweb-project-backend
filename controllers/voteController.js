'use strict';

const {} = require('express');
const { voteInsert } = require('../models/voteModel');

// Insert new vote to post
const post_vote = async (req, res, next) => {
    const vote = req.body;
    const user = req.body;
    console.log('vote added', vote);
    vote.message = `vote added to post with ID: ${await voteInsert(
        vote,
        user,
        req.params.postId,
        next
    )}`;
    res.json(vote);
};

module.exports = {
    post_vote,
};
