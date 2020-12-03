const mongoose = require("mongoose");

var followSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    },
    followingUser: {
      type: mongoose.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

var follow = mongoose.model("follow", followSchema);

module.exports = follow;
