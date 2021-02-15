const mongoose = require('mongoose')

const { Schema } = mongoose

const Post = new Schema({
    authorId: String,
    authorName: String,
    text: String,
    imageUrl: String
})

module.exports = mongoose.model("Post", Post)