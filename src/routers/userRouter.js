const express = require("express");
const users = express.Router();
const userController = require("../controllers/userController.js");

users.get("/", userController.users);

users.post("/login", userController.login);

users.post("/register", userController.register);
module.exports = users;
