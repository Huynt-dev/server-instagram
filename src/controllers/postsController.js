const Posts = require("../models/postsModels.js");

module.exports.posts = async function (req, res) {
  console.log(req.user);

  var posts = await Posts.find();
  res.json({ posts });
};

module.exports.likePost = async function (req, res) {
  const userId = req.user._id;
  const postId = req.params.id;
  // await Posts.update()
  await Posts.updateOne(
    { _id: postId },
    {
      $push: {
        likes: userId
      },
      $inc: {
        totalLike: 1
      }
    }
  );

  res.json({ message: "Like thanh cong" });
};
