const express = require("express");
const profileController = require("../controllers/profile.controller");
const router = express.Router();
const upload = require('../configs/multer.config');
const { fileUploadErrorHandler } = require('../middlewares/fileUpload.middleware');

router.get(
  "/",
  (req, res, next) => {
    req.id = 1;
    next();
  },
  profileController.profile
);

router.post(
    "/update",
    (req, res, next) => {
      req.id = 1;
      next();
    },
    profileController.update
  );


  router.post('/image',  upload.single('image'), fileUploadErrorHandler,(req, res, next) => {
    req.id = 1;
    next();
  }, profileController.updateImage)


module.exports = router;