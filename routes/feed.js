const express = require("express")

const {body} = require('express-validator')

const router = express.Router()

const feedController = require("../controllers/feed")

router.get('/posts',[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:10})
], feedController.getPosts)

router.post('/post',feedController.createPost)

router.get('/post/:postId')

router.put('/post/:postId',[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:10})
],)

module.exports = router