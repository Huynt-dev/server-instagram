var multer = require("multer");
// var upload = multer({ dest: "./public/uploads" });

var path = require("path");

var storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png/)) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
