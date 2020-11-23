const Comment = require("../models/commentModels");

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
        select: "avatar users"
      })
      .execPopulate();

    return res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};
