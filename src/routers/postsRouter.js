const express = require("express");
const posts = express.Router();
const postsController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const upload = require("../middleware/upload");

posts.get("/", postsController.posts);

posts.put("/:id/like", postsController.likePost);

posts.post("/create", upload.single("picture"), postsController.createPost);

posts.get("/:id/comments", commentController.getCommentByPost);

module.exports = posts;
