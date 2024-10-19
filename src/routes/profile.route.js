const express = require("express");
const profileController = require("../controllers/profile.controller");
const router = express.Router();
const upload = require("../configs/multer.config");
const {
  fileUploadErrorHandler,
} = require("../middlewares/fileUpload.middleware");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.get("/", profileController.profile);

router.post("/update",  profileController.update);

router.post(
  "/image",
  upload.single("image"),
  fileUploadErrorHandler,
  profileController.updateImage
);

module.exports = router;
