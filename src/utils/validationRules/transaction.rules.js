const { body, query } = require("express-validator");
const { validateBody } = require("../../middlewares/auth.middleware");

const topUpAmountRules = [
  body("top_up_amount")
    .isNumeric()
    .withMessage("Top up amount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Top up amount must be greater than 0"),
  validateBody,
];

const serviceCodeRules = [
  body("service_code")
    .isString()
    .withMessage("Service code must be a string")
    .isUppercase()
    .withMessage("Service code must be in uppercase"),
  validateBody,
];

const offsetAndLimitRules = [
  query("offset").isInt({ min: 0 }).withMessage("Offset must be greater than or equal to 0"),
  query("limit").isInt({ min: 1 }).withMessage("Limit must be an integer"),
  validateBody,
];

module.exports = { topUpAmountRules, serviceCodeRules, offsetAndLimitRules };
