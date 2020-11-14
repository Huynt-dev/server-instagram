const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user: String,
  email: String,
  image: String,
  password: String
});

var getUsers = mongoose.model("getUsers", userSchema, "users");

module.exports = getUsers;
