const users = require("../models/userModels.js");
const follows = require("../models/followModels.js");

module.exports.follow = async (req, res) => {
  try {
    const userId = req.body.idUser;
    const user = await users.findOne({ _id: userId }).lean();

    if (!user) {
      return res.status(400).json({ error: "User không tồn tại" });
    }

    const following = await follows.create({
      user: req.user._id,
      followingUser: user._id,
    });

    // user của người được follow
    await users.findOneAndUpdate(
      { _id: userId },
      {
        $inc: {
          totalFollower: 1,
        },
      }
    );

    // user của người đi follow
    await users.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: {
          totalFollowing: 1,
        },
      }
    );

    res.status(201).json({ following });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports.unfollow = async (req, res) => {
  try {
    const userId = req.body.idUser;
    const user = await users.findOne({ _id: userId }).lean();

    if (!user) {
      return res.status(400).json({ error: "User không tồn tại" });
    }

    const unfollow = await follows.findOneAndDelete({
      user: req.user._id,
      followingUser: user._id,
    });

    // user của người được follow
    await users.findOneAndUpdate(
      { _id: userId },
      {
        $inc: {
          totalFollower: -1,
        },
      }
    );

    // user của người đi follow
    await users.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: {
          totalFollowing: -1,
        },
      }
    );

    res.status(201).json({ unfollow });
  } catch (error) {
    res.status(400).json({ error });
  }
};
