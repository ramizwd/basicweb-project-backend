'use strict';

// Anonymous function for handling errors.
// Gets the error message and status code and display them.
const httpError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

module.exports = {
    httpError,
};
