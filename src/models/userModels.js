const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  user: String,
  email: String,
  image: String,
  password: String
});

var getUsers = mongoose.model("getUsers", userSchema, "users");

module.exports = getUsers;
