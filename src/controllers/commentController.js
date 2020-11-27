const Comment = require("../models/commentModels");
const Posts = require("../models/postsModels.js");

module.exports.createComment = async function (req, res) {
  try {
    const { postId, content } = req.body;

    const comment = await Comment.create({
      user: req.user._id,
      post: postId,
      content
    });

    await comment
      .populate({
        path: "user post",
        select: "user"
      })
      .execPopulate();

    await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $inc: {
          totalComment: +1
        }
      },
      { new: true }
    );

    return res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.getCommentByPost = async function (req, res) {
  try {
    const id = req.params.id;
    const comments = await Comment.find({ post: id }).populate({
      path: "user",

      select: "user avatar"
    });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.removeComment = async function (req, res) {
  try {
    const { idPost } = req.body;
    const idComment = req.params.id;
    const rm = await Comment.findOneAndRemove({ _id: idComment });
    if (rm) {
      await Posts.findOneAndUpdate(
        { _id: idPost },
        {
          $inc: {
            totalComment: -1
          }
        },
        { new: true }
      );
    }
    res.status(200).json({ idComment });
  } catch (error) {
    res.status(400).json({ error });
  }
};
