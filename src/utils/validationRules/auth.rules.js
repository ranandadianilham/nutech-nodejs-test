const { body } = require("express-validator");
const { validateBody } = require("../../middlewares/auth.middleware");

const userRegistrationRules = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("first_name")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),
    body("last_name")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter"),
    validateBody,
  ];
  
  const userLoginRules = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter"),
    validateBody,
  ];

  module.exports = {userRegistrationRules, userLoginRules}