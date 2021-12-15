'use strict';

const {
    getCommentVote,
    commentVoteInsert,
    deleteCommentVote,
    commentVoteUpdate,
} = require('../models/commentVoteModal');

// Get comment's votes
const get_comment_vote = async (req, res, next) => {
    const commentVote = await getCommentVote(
        req.params.userId,
        req.params.commentId,
        next
    );
    res.json(commentVote);
};

// Insert comment's vote
const post_comment_vote = async (req, res, next) => {
    const user = req.body;
    const commentVote = req.body;
    console.log(req.body);
    commentVote.message = `vote added to comment with ID: ${await commentVoteInsert(
        user,
        commentVote,
        req.params.commentId,
        next
    )}`;
    res.json(commentVote);
};

// Delete comment's vote
const delete_comment_vote = async (req, res, next) => {
    const bodyInfo = req.body;
    const deleted = await deleteCommentVote(
        bodyInfo,
        req.params.commentId,
        next
    );
    res.json({ message: `comment's vote deleted: ${deleted}` });
};

// Update comment's vote
const update_comment_vote = async (req, res, next) => {
    const commentVoteBody = req.body;
    const commentVote = await commentVoteUpdate(
        commentVoteBody,
        req.params.commentId,
        next
    );
    res.json({ message: `Vote updated: ${commentVote}` });
};

module.exports = {
    get_comment_vote,
    post_comment_vote,
    delete_comment_vote,
    update_comment_vote,
};
