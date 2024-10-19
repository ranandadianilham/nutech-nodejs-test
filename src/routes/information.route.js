const express = require("express");
const router = express.Router();
const informationController = require("./../controllers/information.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

router.get("/services", informationController.services);
router.get("/banner", informationController.banner);

module.exports = router;
