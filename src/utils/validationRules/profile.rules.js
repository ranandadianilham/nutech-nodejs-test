const { body } = require("express-validator");
const { validateBody } = require("../../middlewares/auth.middleware");

const updateProfileRules = [body("first_name")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters"),
  body("last_name")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters"), validateBody]




    module.exports = {
        updateProfileRules
    }