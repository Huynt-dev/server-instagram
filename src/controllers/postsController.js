const Posts = require("../models/postsModels.js");

module.exports.posts = async function (req, res) {
  try {
    var posts = await Posts.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$$postId", "$post"] } }
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $unwind: "$user"
            },
            {
              $project: {
                user: {
                  user: 1,
                  avatar: 1
                },
                content: 1
              }
            }
          ],
          as: "comments"
        }
      },
      {
        $project: {
          user: {
            user: 1,
            avatar: 1
          },
          image: 1,
          content: 1,
          likes: 1,
          totalLike: 1,
          comments: {
            content: 1,
            user: 1
          }
        }
      }
    ]);

    return res.status(200).json({ posts });
  } catch (e) {
    res.status(400).json({ e });
  }
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

    await post
      .populate({
        path: "user",
        select: "avatar user"
      })
      .execPopulate();
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
