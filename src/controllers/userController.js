const users = require("../models/userModels.js");
const posts = require("../models/postsModels");
const follows = require("../models/followModels");

module.exports.users = async function (req, res) {
  var data = await users.find();
  res.json({ data });
};

module.exports.profile = async (req, res) => {
  try {
    var username = req.params.username;
    var userProfile = await users
      .findOne({ user: username })
      .select({ password: 0 })
      .lean();
    var postOfUser = await posts
      .find({ user: userProfile._id })
      .select("image");

    var isFollow = await follows.findOne({
      user: req.user._id,
      followingUser: userProfile._id,
    });

    res.status(200).json({
      userProfile,
      postOfUser,
      isFollow: !!isFollow,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.friend = async (req, res) => {
  try {
    const dataFriend = await users
      .find({
        _id: {
          $ne: req.user._id,
        },
      })
      .select("email name user avatar")
      .limit(5);
    res.status(200).json({ dataFriend });
  } catch (error) {
    res.status(400).json({ error });
  }
};
