const { Router } = require('express')
const Post = require('../models/Post')
const cloudinary = require("../utils/cloudinary")
const router = Router()

router.get('/', async (req, res) => {
    if (req.session.isAuth) {
        const posts = await Post.find().sort('-timestamp').exec()

        res.json({ message: "post sent to frontend", report: true, posts: posts })
    }
    else {
        res.status(401).json({ message: "Unauthorized Access", report: false })
    }
})


router.post('/', async (req, res) => {
    const { authorId, authorName, text, imageData, imageName } = req.body

    if (req.session.isAuth && req.session._id == authorId) {
        const post = { authorId, authorName, text }
        post.timestamp = Date.now()

        if (imageData) {
            const result = await cloudinary.uploader.upload(imageData)
            console.log(result)
            post.imageName = imageName
            post.imageUrl = result.secure_url
            post.publicId = result.public_id
        }

        const newPost = await new Post(post)
        newPost.save()
        console.log(`${newPost.authorName} has uploaded a New Post`)
        res.status(201).json({ message: "post created", report: true, post: newPost })
    }
    else {
        res.status(401).json({ message: "Unauthorized Access", report: false })
    }
})

module.exports = router