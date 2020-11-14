require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const bcrypt = require("bcryptjs");

const isAuth = require("./middleware/isAuth.js");

const routerUsers = require("./routers/userRouter.js");
const routerPosts = require("./routers/postsRouter.js");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/users", routerUsers);
app.use("/posts", isAuth, routerPosts);

mongoose.connection.on("connected", () => {
  console.log("Connected !!!!!");
  app.listen(process.env.PORT, () => {
    console.log("Server is running");
  });
});
