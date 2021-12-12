'use strict';

const {
    voteInsert,
    voteUpdate,
    getVote,
    deleteVote,
} = require('../models/voteModel');

const get_vote = async (req, res, next) => {
    // const user = req.body;
    const vote = await getVote(req.params.userId, req.params.postId, next);
    res.json(vote);
};
// Send user, vote, and post id info to voteInsert function then get a JSON response from it
const post_vote = async (req, res, next) => {
    const user = req.body;
    const vote = req.body;
    console.log('vote added', vote);
    vote.message = `vote added to post with ID: ${await voteInsert(
        user,
        vote,
        req.params.postId,
        next
    )}`;
    res.json(vote);
};

// Update vote
const update_vote = async (req, res, next) => {
    const voteBody = req.body;
    const vote = await voteUpdate(voteBody, req.params.postId, next);
    res.json({ message: `Vote updated: ${vote}` });
    console.log('updated vote', body, req.params.postId);
};

// Delete vote
const delete_vote = async (req, res, next) => {
    const bodyInfo = req.body;
    const deleted = await deleteVote(bodyInfo, req.params.postId, next);
    res.json({ message: `Vote deleted: ${deleted}` });
};
// Export functions
module.exports = {
    post_vote,
    update_vote,
    get_vote,
    delete_vote,
};
