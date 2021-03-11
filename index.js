require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS);

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// const isAuth = require("./middleware/isAuth.js")

const routerAuth = require("./src/routers/authRouter.js");
const routerUsers = require("./src/routers/userRouter.js");
const routerPosts = require("./src/routers/postsRouter.js");
const routerComment = require("./src/routers/commentRouter");
const routerFollow = require("./src/routers/followRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", function (req, res) {
  res.send("Server is running");
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
  app.listen(process.env.PORT || 80, () => {
    console.log("Server is running");
  });
});
