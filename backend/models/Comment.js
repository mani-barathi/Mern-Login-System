const mongoose = require('mongoose')

const { Schema } = mongoose

const Comment = new Schema({
    authorId: String,
    authorName: String,
    postId:String,
    text: String,
    timestamp: String
})

module.exports = mongoose.model("Comment", Comment)