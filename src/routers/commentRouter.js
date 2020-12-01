const express = require("express");
const comment = express.Router();
const commentController = require("../controllers/commentController");
const isAuth = require("../middleware/isAuth.js");

comment.post("/create", isAuth, commentController.createComment);

comment.put("/:id/remove", isAuth, commentController.removeComment);

module.exports = comment;
