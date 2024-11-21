// const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");
const PostSchemea = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Post", PostSchemea);
