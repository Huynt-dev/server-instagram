const express = require("express");
const follow = express.Router();
const followController = require("../controllers/followController.js");
const isAuth = require("../middleware/isAuth.js");

follow.post("/following", isAuth, followController.follow);

module.exports = follow;
