const express = require("express");
const comment = express.Router();
const commentController = require("../controllers/commentController");

comment.post("/create", commentController.createComment);

module.exports = comment;
