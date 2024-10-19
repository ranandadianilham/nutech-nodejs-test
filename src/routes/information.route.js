const express = require("express");
const router = express.Router();
const informationController = require('./../controllers/information.controller')

router.get('/services', informationController.services)
router.get('/banner', informationController.banner)

module.exports = router;