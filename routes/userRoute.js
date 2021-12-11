'use strict';

const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
// Upload image or mp4 file types else throw an error
const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only images formats allowed!'));
    }
};
const upload = multer({ dest: './uploads', fileFilter });
const router = express.Router();
const {
    user_get_all,
    user_get,
    delete_user,
    user_update,
    checkToken,
    user_update_profile,
} = require('../controllers/userController');

router.get('/token', checkToken);

router
    .route('/')
    // Get request to user_get_all using express routing
    .get(user_get_all)

    // Update user http request method
    .put(user_update);

router
    .route('/:userId')
    .get(user_get) // Get user by id
    .delete(delete_user); // Delete user by id

// Edit user profile route
router
    .route('/profile/:userId')
    .put(
        upload.single('profile_picture'),
        body('username').isLength({ min: 5 }),
        body('description').isLength({ min: 10 }),
        user_update_profile
    );

module.exports = router;
