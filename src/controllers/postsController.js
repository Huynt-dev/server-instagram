const Posts = require("../models/postsModels.js");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.posts = async function (req, res) {
  try {
    const limit = 2;
    var posts = await Posts.find()
      .populate({
        path: "user",
        select: "user avatar",
      })
      .limit(limit)
      .sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (e) {
    res.status(400).json({ e });
  }
};

module.exports.InfiniteScroll = async function (req, res) {
  try {
    const { limit, page } = req.query;
    var posts = await Posts.find()
      .populate({
        path: "user",
        select: "user avatar",
      })
      .limit(parseInt(limit))
      .skip(parseInt(limit * page))
      .sort({ createdAt: -1 });
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
          likes: userId,
        },
        $inc: {
          totalLike: -1,
        },
      },
      { new: true }
    );

    return res.status(200).json({ post });
  } else {
    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          likes: userId,
        },
        $inc: {
          totalLike: 1,
        },
      },
      { new: true }
    );

    return res.status(200).json({ post });
  }
};

module.exports.createPost = async function (req, res) {
  try {
    const { postNew } = req.body;

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    const imageUpload = await cloudinary.uploader.upload(
      path,
      { public_id: `instagram/${uniqueFilename}`, tags: `instagram` },
      function (err, result) {
        if (err) return res.send(err);
        // console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        return result;
      }
    );

    const post = await Posts.create({
      user: req.user._id,
      content: postNew,
      image: imageUpload.secure_url,
    });

    await post
      .populate({
        path: "user",
        select: "avatar user",
      })
      .execPopulate();
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// module.exports.postsProfile = async function (req, res) {
//   try {
//     const username = req.params.username;
//     console.log(username);
//     var postsUser = await Posts.find({ user: username })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "user",
//         select: "user avatar"
//       });

//     return res.status(200).json({ postsUser });
//   } catch (e) {
//     res.status(400).json({ e });
//   }
// };
