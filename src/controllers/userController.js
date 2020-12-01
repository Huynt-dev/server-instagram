const users = require("../models/userModels.js");
const posts = require("../models/postsModels");

module.exports.users = async function (req, res) {
  var data = await users.find();
  res.json({ data });
};

module.exports.profile = async (req, res) => {
  try {
    var username = req.params.username;
    var userProfile = await users
      .findOne({ user: username })
      .select("_id email name user avatar")
      .lean();
    var postOfUser = await posts.find({ user: userProfile._id });

    res.status(200).json({
      userProfile,
      postOfUser
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
          $ne: req.user._id
        }
      })
      .select("email name user avatar")
      .limit(5);
    res.status(200).json({ dataFriend });
  } catch (error) {
    res.status(400).json({ error });
  }
};
