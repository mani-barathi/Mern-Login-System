const mongoose = require('mongoose')

const { Schema } = mongoose

const Post = new Schema({
    authorId: String,
    authorName: String,
    text: String,
    noOfComments:{
        type:Number,
        default : 0
    },
    imageName: String,
    imageUrl: String,
    publicId: String,
    timestamp: {
        type: String
    },
})

module.exports = mongoose.model("Post", Post)