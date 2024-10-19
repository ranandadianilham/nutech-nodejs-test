const express = require("express");
const authController = require("../controllers/auth.controller");
const { query, body } = require("express-validator");
const { validateBody } = require("../middlewares/auth.middleware");
const { userRegistrationRules, userLoginRules } = require("../utils/validationRules/auth.rules");

const router = express.Router();


router.post("/register", userRegistrationRules , authController.register);
router.post("/login", userLoginRules, authController.login);

module.exports = router;
