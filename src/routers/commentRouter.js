const express = require("express");
const comment = express.Router();
const commentController = require("../controllers/commentController");

comment.post("/create", commentController.createComment);

comment.put("/:id/remove", commentController.removeComment);

module.exports = comment;
