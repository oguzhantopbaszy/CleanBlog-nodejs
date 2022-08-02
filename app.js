const express = require('express')
const mongoose = require('mongoose')

const ejs = require('ejs')
const path = require('path')
const Post = require('./models/Post')

const app = express();

app.use(express.static('public'))

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add_post', (req, res) => {
    res.render('add_post')
})

app.post('/add_post', async (req, res) => {
    await Post.create(req.body)
    res.redirect('/')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req,res) => {
    res.render('post')
})



const port = 3000;
app.listen(port, () => {
    console.log(`Started the server on port ${port}`)
})
