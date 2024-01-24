const { body, param, validationResult } = require("express-validator");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require("../errors/customErrors");
const models = require("../models");
const { isValidPassword } = require("../utils/validPassword");
const User = models.user;
const Color = models.color;

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);

        if (errorMessage[0].endsWith("already exists")) {
          throw new ConflictError(errorMessage);
        }

        if (errorMessage[0].startsWith("no ")) {
          throw new NotFoundError(errorMessage);
        }

        throw new BadRequestError(errorMessage);
      }

      next();
    },
  ];
};

/****** User validation start ******/

const validateRegisterInput = withValidationErrors([
  body("fName").notEmpty().withMessage("first name is empty").escape(),
  body("lName").notEmpty().withMessage("last name is required").escape(),
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
    .withMessage("username should be longer than 5 words")
    .custom(async (username) => {
      const user = await User.findOne({
        where: { username: username },
        attributes: ["username"],
      });
      if (user) {
        throw new ConflictError("username already exists");
      }
    }),
  body("password") // TODO: need to add check for password
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 9 })
    .withMessage("password must be at least 9 characters long")
    .custom(async (password) => {
      if (!isValidPassword(password))
        throw new Error(
          "password should contain at least 9 characters, alphanumerical values and special characters"
        );
    }),
]);

const validateLoginInput = withValidationErrors([
  body("usernameOrEmail").notEmpty().withMessage("username is not provided"),
  body("password").notEmpty().withMessage("password is required"),
]);

const validateUserUpdate = withValidationErrors([
  body("fName")
    .notEmpty()
    .withMessage("first name should be provided")
    .optional(),
  body("lName")
    .notEmpty()
    .withMessage("last name should be provided")
    .optional(),
  body("username")
    .notEmpty()
    .withMessage("username should be provided")
    .optional(),
  body("password")
    .isEmpty()
    .not()
    .withMessage("password cannot be changed directly")
    .optional(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (user && user.id.toString() !== req.user.id) {
        throw new ConflictError("email already exists");
      }
    })
    .optional(),
]);
/****** User validation end ******/

/****** Color validation start ******/
const validateColorUpdate = withValidationErrors([
  body("color").notEmpty().withMessage("color is required"),
]);

const validateColorIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const color = await Color.findOne({
      where: {
        id: value,
        userId: req.user.id,
      },
    });

    if (!color) throw new NotFoundError(`no color with id ${value}`);
  }),
]);

/****** Color validation end ******/

module.exports = {
  withValidationErrors,
  validateRegisterInput,
  validateLoginInput,
  validateUserUpdate,
  validateColorUpdate,
  validateColorIdParam,
};
