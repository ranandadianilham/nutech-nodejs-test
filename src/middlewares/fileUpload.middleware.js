const multer = require("multer");

// middleware/fileUploadMiddleware.js
exports.fileUploadErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "File is too large. Maximum size is 5MB",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        status: "error",
        message: "Too many files. Maximum is 5 files",
      });
    }
  }

  if (error.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  next();
};

