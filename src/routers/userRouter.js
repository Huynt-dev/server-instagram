const express = require("express");
const users = express.Router();
const userController = require("../controllers/userController.js");
const isAuth = require("../middleware/isAuth.js");

users.get("/", userController.users);

users.get("/:username/profile", userController.profile);

users.get("/friend", isAuth, userController.friend);
module.exports = users;
