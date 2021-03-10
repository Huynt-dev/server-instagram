require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// const isAuth = require("./middleware/isAuth.js")

const routerAuth = require("./routers/authRouter.js");
const routerUsers = require("./routers/userRouter.js");
const routerPosts = require("./routers/postsRouter.js");
const routerComment = require("./routers/commentRouter");
const routerFollow = require("./routers/followRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/auth", routerAuth);
app.use("/users", routerUsers);
app.use("/posts", routerPosts);
app.use("/comment", routerComment);
app.use("/follow", routerFollow);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

mongoose.connection.on("connected", () => {
  console.log("Connected !!!!!");
  app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running");
  });
});
