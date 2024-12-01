// server/middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const upload = multer({
  dest: path.join(__dirname, "../uploads"),
  limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit (10 MB)
}).fields([
  { name: "q1" },
  { name: "q2" },
  { name: "q3" },
]);

module.exports = upload;
