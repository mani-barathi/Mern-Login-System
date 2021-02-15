const { Router } = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = Router()

router.get('/', (req, res) => {
    const posts = [1, 2, 2, 3, 4]
    res.json({ message: "post sent to frontend", report: true, posts: posts })
})


router.post('/', async (req, res) => {
    const data = req.body
    if (req.session.isAuth) {
        console.log(`${req.session._id} ---> ${text}`)
        data.imageUrl = data.imageUrl || null
        const author = await User.findById(req.session._id)
        data.authorName = author.name
        data.aithorId = author.id
        console.log(data)
        const newPost = await new Post(post)
        console.log(newPost)

        res.status(201).json({ message: "post created", report: true, post: { text: "hello", imageUrl: "image.jpg" } })
    }
    else {
        res.status(401).json({ message: "Unauthorized Access", report: false })
    }
})

module.exports = router