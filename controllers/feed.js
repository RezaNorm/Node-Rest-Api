exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [{ title: "first post", content: "this is the first post" }],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
