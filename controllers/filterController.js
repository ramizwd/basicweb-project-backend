'use strict';
const {filterAll} = require(
'../models/filterModel');

const {httpError} = require('../utils/errors');

// Return a JSON array of the filtered if there is any otherwise send an error message
// with status code to the client
const filter = async (req, res, next) => {
    console.log("new",req.params.filterKey);
    const filt = await filterAll(req.params.filterKey,next);
    res.json(filt);
    const err = httpError('could not filter', 404);
    next(err);
};

module.exports = {
    filter
};