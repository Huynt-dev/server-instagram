const mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    image: String,
    content: String,
    likes: {
      type: Array,
      default: []
    },
    totalLike: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

var getPosts = mongoose.model("getPosts", postSchema, "posts");

module.exports = getPosts;
