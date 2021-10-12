const { validationResult } = require("express-validator");

const fs = require('fs')

const path = require('path')

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) =>
      res
        .status(200)
        .json({ message: "posts fetched successfully", posts: posts })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("fuck my llife im tired im done");
    error.statusCode = 422;
    throw error;
  }
  if(!req.file) {
    const error = new Error('image wasnt found')
    error.statusCode = 422
    throw error
  }
  const title = req.body.title;
  const imageUrl = req.file.path
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {
      name: "reza",
    },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "post created successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.fetchPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) =>
    {
      if(!post){
        const error = new Error('could not find post')
        error.status = 404
        throw error
      }
      res
        .statusCode(200)
        .json({ message: "post fetched successfully", post: post })
    }
      
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req,res,next) => {
const postId = req.params.postId 
const title = req.body.title
let imageUrl = req.body.image 
const content = req.body.content 

if(req.file) {
  imageUrl = req.file.path
}
if(!imageUrl){
  const error = new Error('image not found')
  error.statusCode = 422
  throw error
}

Post.findById(prodId).then(post => {
  if(!post){
    
      const error = new Error('could not find post')
      error.status = 404
      throw error
    
  }
  if (imageUrl !== post.imageUrl){
    clearImage(post.imageUrl)
  }
  post.title = title
  post.content = content
  post.imageUrl = imageUrl 
  return post.save()
}).then(result => {
  res.status(200).json({message:'post updated',post:result})
}).catch(err =>{
  const error = new Error('could not find post')
  error.status = 404
  throw error
} )

}

const clearImage = filePath => {
filePath = path.join(__dirname,'..',filePath)
fs.unlink(filePath,err => console.log(err))
}