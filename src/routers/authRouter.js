const express = require("express");
const auth = express.Router();
const authController = require("../controllers/authController.js");

auth.post("/login", authController.login);

auth.post("/register", authController.register);

module.exports = auth;
