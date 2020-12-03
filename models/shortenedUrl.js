const mongoose = require("mongoose");
const shortId = require("shortId");

const shortUrlSchema = new mongoose.Schema({
    original: {
        type: String,
        require: true
    },
    short: {
        type: String,
        require: true,
        default: shortId.generate
    }
});

module.exports = mongoose.model('shortenedUrl', shortUrlSchema);