const users = require("../models/userModels.js");
const follows = require("../models/followModels.js");

module.exports.follow = async (req, res) => {
  try {
    const userId = req.body;
    console.log(userId);
    const user = await users.findOne({ _id: userId.idUser }).lean();

    if (!user) {
      return res.status(400).json({ error: "user khong ton tai" });
    }
    console.log(user);

    const following = await follows.create({
      user: req.user._id,
      followingUser: user._id
    });

    res.status(201).json({ following });
  } catch (error) {
    res.status(400).json({ error });
  }
};
