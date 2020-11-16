var jwt = require("jsonwebtoken");
const getUsers = require("../models/userModels.js");
module.exports.users = async function (req, res) {
  var users = await getUsers.find();
  res.json({ users });
};

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUsers.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Email or password is invalid" });
    }

    const dataSign = {
      email: user.email,
      _id: user._id,
      name: user.name
    };

    const token = await jwt.sign(dataSign, process.env.JWT_KEY);

    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
};
