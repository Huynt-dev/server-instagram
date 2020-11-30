const users = require("../models/userModels.js");

module.exports.users = async function (req, res) {
  var data = await users.find();
  res.json({ data });
};

module.exports.profile = async (req, res) => {
  var username = req.params.username;
  var userProfile = await users.findOne({ user: username }).lean();
  res.status(200).json({
    userProfile
  });
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
