const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  userPost: String,
  image: String,
  content: String,
  likes: Array,
  totalLike: Number
});

var getPosts = mongoose.model("getPosts", postSchema, "posts");

module.exports = getPosts;
