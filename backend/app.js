require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const app = express()

// importing Routes
const authRoutes = require('./routes/auth')

app.use(cors({
    origin: [process.env.ORIGIN],              //frontend url
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true                         // enable set cookie
}))

app.use(express.json());                            // for json 
app.use(express.urlencoded({ extended: true }));    // x-www-form-urlencoded header requests

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("mongoDB connected ....!"))


const store = new MongoStore({
    url: process.env.DB_URL,
    collection: 'mySession'
})
store.on('error', (err) => console.log(err))


app.use(session({
    secret: 'Keyboard cat',
    store: store,
    resave: false,
    saveUninitialized: true
}))


app.get('/', (req, res) => {
    console.log(req.session.id)
    // res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
    res.json({ message: "getting requset ...Happy codding" })
})

// Routes
app.use('/auth', authRoutes)


app.listen(process.env.PORT, () => console.log(`App running at http://localhost:${process.env.PORT}/`))