var multer = require("multer");
var upload = multer({ dest: "./src/public/uploads/" });

module.exports = upload;
