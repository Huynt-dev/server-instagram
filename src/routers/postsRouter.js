const express = require("express");
const posts = express.Router();
const postsController = require("../controllers/postsController.js");
posts.get("/", postsController.posts);

posts.put("/:id", postsController.likePost);

module.exports = posts;
