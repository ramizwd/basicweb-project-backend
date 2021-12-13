'use strict';
const sharp = require('sharp');

//to make the thumbnail
const makeThumbnail = async (file, thumbname) => {
    //await for the file
    return await sharp(file)
        //resize the size of image
        .resize(1920, 1080)
        //where to get the file info
        .toFile('./thumbnails/' + thumbname);
};
module.exports = {
    makeThumbnail,
};
