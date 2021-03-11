const mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    image: String,
    content: String,
    likes: {
      type: Array,
      default: [],
    },
    totalLike: {
      type: Number,
      default: 0,
    },
    totalComment: {
      type: Number,
      default: 0,
    },
    expire_at: { type: Date, default: Date.now, expires: 43200 },
  },

  { timestamps: true }
);

var post = mongoose.model("post", postSchema);

module.exports = post;
