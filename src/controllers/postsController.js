const Posts = require("../models/postsModels.js");

module.exports.posts = async function (req, res) {
  console.log(req.user);

  var posts = await Posts.find();
  res.json({ posts });
};

module.exports.likePost = async function (req, res) {
  const userId = req.user._id;
  const postId = req.params.id;
  const postLike = await Posts.findOne({ _id: postId });

  if (postLike.likes.includes(userId)) {
    const post = await Posts.updateOne(
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

    return res.status(200).json(post);
  } else {
    const post = await Posts.updateOne(
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

    return res.status(200).json(post);
  }
};
