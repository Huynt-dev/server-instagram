const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "post"
    },
    content: String
  },
  { timestamps: true }
);

var comment = mongoose.model("comment", commentSchema);

module.exports = comment;
