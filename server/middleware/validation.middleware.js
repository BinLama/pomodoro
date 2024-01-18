const { body, validationResult } = require("express-validator");
const { BadRequestError, ConflictError } = require("../errors/customErrors");
const models = require("../models");
const User = models.user;

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);

        throw new BadRequestError(errorMessage);
      }

      next();
    },
  ];
};

const validateRegisterInput = withValidationErrors([
  body("fName").notEmpty().withMessage("first name is empty"),
  body("lName").notEmpty().withMessage("last name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please enter a proper email")
    .custom(async (email) => {
      const user = await User.findOne({
        where: { email: email },
        attributes: ["email"],
      });
      if (user) {
        throw new ConflictError("email already exists");
      }
    }),
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 5 })
    .withMessage("username should be longer than 5 words"),
  // .custom(async (username) => {
  //   const user = await User.findOne({
  //     where: { username: username },
  //     attributes: ["username"],
  //   });
  //   if (user) {
  //     throw new ConflictError("username already exists");
  //   }
  // })
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 9 })
    .withMessage("password must be at least 9 characters long"),
]);

module.exports = { withValidationErrors, validateRegisterInput };
