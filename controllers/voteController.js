'use strict';

const {} = require('express');
const { voteInsert, voteUpdate } = require('../models/voteModel');

// Send user, vote, and post id info to voteInsert function then get a JSON response from it
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

// Update vote
const update_vote = async (req, res, next) => {
    const vote = await voteUpdate(req.body, req.params.postId, next);
    res.json({ message: `Vote updated: ${vote}` });
    console.log('updated vote', body, req.params.postId);
};

// Export functions
module.exports = {
    post_vote,
    update_vote,
};
