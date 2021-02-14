const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = Router()

router.post('/signup', async (req, res) => {
    const data = req.body

    const oldUsers = await User.find({ email: data.email })
    console.log(oldUsers)
    if (oldUsers.length > 0) {
        return res.send({ message: `Account already exists with email ${data.email}`, report: false })
    }

    data.password = await bcrypt.hash(data.password, 10)

    const newUser = await new User(data)
    await newUser.save()
    console.log(newUser)
    const { name, email, _id } = newUser
    res.send({ message: `Account created for ${name}`, user: { name, email, _id }, report: true })
})


router.post('/login', async (req, res) => {
    const data = req.body

    const user = await User.findOne({ email: data.email })
    if (user) {
        if (await bcrypt.compare(data.password, user.password)) {
            req.session.isAuth = true
            req.session._id = user._id
            console.log(`${user.name} has logged In`)
            const { name, email, _id } = user
            return res.send({ message: `Successfuly Logged In`, user: { name, email, _id }, report: true })
        }
        return res.send({ message: `Invalid Credentials`, report: false })
    }
    else
        return res.send({ message: `No User Exists with a email of ${data.email} `, report: false })
})


router.post('/islogged', async (req, res) => {
    console.log(req.session.id)
    if (req.session.isAuth) {
        const user = await User.findById(req.session._id)
        const { name, email, _id } = user
        return res.send({ message: `Already Logged In`, user: { name, email, _id }, report: true })
    } else {
        console.log('No preivious Login!!')
        res.json({ report: false })
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.statusCode = 200
    res.json({ report: true })
})


module.exports = router