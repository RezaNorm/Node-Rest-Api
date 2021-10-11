const { validationResult } = require("express-validator/check");

exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [
      {
        id: "1",
        title: "first post",
        content: "this is the first post",
        imageUrl: "images/kitten-puppy.jpg",
        creator: {
          name: "reza",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "fuck my llife im tired im done", errors:errors.array() });
  }
  res.status(201).json({
    message: "post created successfully",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "reza",
        createdAt: new Date(),
      },
    },
  });
};
