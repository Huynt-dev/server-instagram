var jwt = require("jsonwebtoken");
const getUsers = require("../models/userModels.js");
module.exports.users = async function (req, res) {
  var users = await getUsers.find();
  res.json({ users });
};

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUsers
      .findOne({ email, password })
      .select("user email avatar ");

    if (!user) {
      return res.status(401).json({ error: "Email or password is invalid" });
    }

    const dataSign = {
      email: user.email,
      _id: user._id,
      name: user.user
    };

    const token = await jwt.sign(dataSign, process.env.JWT_KEY);

    res.json({ token, user });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.register = async (req, res) => {
  try {
    const { email, name, user, password } = req.body;
    const existedUser = await getUsers.findOne({
      $or: [{ email: email }, { user: user }]
    });

    console.log(existedUser);

    if (existedUser) {
      return res.status(400).json({
        error: "Email đã được sử dụng"
      });
    }

    const newUser = await getUsers.create(req.body);

    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};
