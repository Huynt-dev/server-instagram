const Posts = require("../models/postsModels.js");
// const mongoose = require("mongoose");

module.exports.posts = async function (req, res) {
  // console.log(req.user);

  var posts = await Posts.find().sort({ createdAt: -1 });
  res.json({ posts });
};

module.exports.likePost = async function (req, res) {
  const userId = req.user._id;
  const postId = req.params.id;
  const postLike = await Posts.findOne({ _id: postId });

  if (postLike.likes.includes(userId)) {
    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          likes: userId
        },
        $inc: {
          totalLike: -1
        }
      },
      { new: true }
    );

    return res.status(200).json({ post });
  } else {
    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          likes: userId
        },
        $inc: {
          totalLike: 1
        }
      },
      { new: true }
    );

    return res.status(200).json({ post });
  }
};

module.exports.createPost = async function (req, res) {
  try {
    const { postNew } = req.body;

    const post = await Posts.create({
      user: req.user._id,
      content: postNew,
      image: req.file.filename
    });
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
