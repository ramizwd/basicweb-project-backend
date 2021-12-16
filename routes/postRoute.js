'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');

// Upload image or mp4 file types else throw an error
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image') || file.mimetype.includes('video/mp4')) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only images and MP4 formats allowed!'));
    }
};
const upload = multer({ dest: './uploads', fileFilter });
const {
    post_get_all,
    post_get,
    post_insert,
    post_delete,
    get_user_posts,
    search_post,
} = require('../controllers/postController');
const router = express.Router();

router
    .route('/')
    .get(post_get_all) // Get request for getting all posts
    // Validate data and request Post request for inserting new post
    .post(
        upload.single('filename'),
        body('title').isLength({ min: 2, max: 20 }),
        body('description').isLength({ min: 5, max: 100 }),
        post_insert
    );

router
    .route('/:postId')
    .get(post_get) // Get post by id request
    .delete(post_delete); // Delete request

// Route for getting user's posts
router.route('/user/:userId').get(get_user_posts);

// Search post by word/letter route
router.route('/search/:key').get(search_post);

module.exports = router;
