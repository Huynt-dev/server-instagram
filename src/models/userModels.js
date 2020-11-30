const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  user: String,
  name: String,
  email: String,
  avatar: {
    type: String,
    default: "https://robohash.org/temporibusonisadipisci.png?size=300x300"
  },
  password: String
});

var user = mongoose.model("user", userSchema);

module.exports = user;
