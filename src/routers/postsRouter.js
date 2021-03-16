const express = require("express");
const posts = express.Router();
const postsController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const upload = require("../middleware/upload");
const isAuth = require("../middleware/isAuth.js");

posts.get("/", isAuth, postsController.posts);

// posts.get("/:username", isAuth, postsController.postsProfile);

posts.put("/:id/like", isAuth, postsController.likePost);

posts.post(
  "/create",
  isAuth,

  postsController.createPost
);

posts.get("/:id/comments", isAuth, commentController.getCommentByPost);

module.exports = posts;
