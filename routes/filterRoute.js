'use strict';

const express = require('express');
const {
    filter,
} = require('../controllers/filterController');
const router = express.Router();
//get the filtered
router.route('/:filterKey').get(filter);

module.exports = router;
