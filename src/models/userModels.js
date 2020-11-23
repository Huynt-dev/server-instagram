const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  user: String,
  email: String,
  image: String,
  password: String
});

var user = mongoose.model("user", userSchema);

module.exports = user;
