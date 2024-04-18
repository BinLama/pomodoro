const { body, param, validationResult } = require("express-validator");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require("../errors/customErrors");
const { isValidPassword } = require("../utils/validPassword");

// models
const models = require("../models");
const User = models.user;
const Color = models.color;
const Task = models.task;
const Setting = models.setting;

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

const validateSignUpInput = withValidationErrors([
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

const validateColorIdParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .custom(async (value, { req }) => {
      const color = await Color.findOne({
        where: {
          id: value,
          userId: req.user.id,
        },
      });

      if (!color) throw new NotFoundError(`no color with id ${value}`);
    }),
]);

const validateColorUpdate = withValidationErrors([
  body("color").notEmpty().withMessage("color is required"),
]);

/****** Color validation end ******/

/****** Setting validation start ******/
const validateSettingIdParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .custom(async (value, { req }) => {
      const setting = await Setting.findOne({
        where: {
          id: value,
          userId: req.auth.id,
        },
      });

      if (!setting) throw new NotFoundError(`no setting with id ${value}`);

      req.setting = setting;
    }),
]);

const validateSettingUpdate = withValidationErrors([
  body("studyTime")
    .isInt({ min: 1, max: 60 })
    .withMessage("study time should be between 1 and 60 min")
    .optional(),
  body("relaxTime")
    .isInt({ min: 1, max: 60 })
    .withMessage("relax time should be between 1 and 60 min")
    .optional(),
  body("longRelaxTime")
    .isInt({ min: 1, max: 60 })
    .withMessage("long relax time should be between 1 and 60 min")
    .optional(),
  body("maxPomodoroSession")
    .isInt({ min: 1 })
    .withMessage("you should aim to complete at least one session")
    .optional(),
  body("longRelaxInterval")
    .isInt({ max: 10 })
    .withMessage("you should take a long break after at most 10 sessions")
    .optional(),
  body("autoBreak")
    .isInt({ min: 0, max: 1 })
    .withMessage("auto break should either be 0 or 1")
    .optional(),
  body("autoStudy")
    .isInt({ min: 0, max: 1 })
    .withMessage("auto study should either be 0 or 1")
    .optional(),
  body("studyStartSound")
    .notEmpty()
    .withMessage("study sound is required")
    .isString()
    .withMessage("study sound should be string")
    .toLowerCase()
    .optional(),
  body("restStartSound")
    .notEmpty()
    .withMessage("rest sound is required")
    .isString()
    .withMessage("rest sound should be string")
    .toLowerCase()
    .optional(),
  body("volume")
    .isInt({ min: 1, max: 100 })
    .withMessage("volume should be between 1 and 100 percent")
    .optional(),
  body("level")
    .notEmpty()
    .withMessage("level is required")
    .isString()
    .withMessage("level sound should be string")
    .toLowerCase()
    .optional(),
  body("mute")
    .isBoolean()
    .withMessage("mute should be true or false")
    .optional(),
]);
/****** Setting validation end ******/

/****** Task validation start ******/
const validateTaskCreate = withValidationErrors([
  body("title").notEmpty().withMessage("title is required"),
]);

const validateTaskIdParam = withValidationErrors([
  param("id")
    .notEmpty()
    .withMessage("id is required")
    .custom(async (value, { req }) => {
      console.log("Value:", value);
      const task = await Task.findOne({
        where: {
          id: value,
          userId: req.auth.id,
        },
      });

      if (!task) throw new NotFoundError(`no task with id ${value}`);

      req.task = task;
      console.log("got to valid task id");
    }),
]);

const validateTaskUpdate = withValidationErrors([
  body("completed")
    .notEmpty()
    .withMessage("completed is required")
    .isBoolean({ strict: true })
    .withMessage("completed should be boolean")
    .optional(),
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title should be stirng")
    .optional(),
  body("note").isString().withMessage("note should be string").optional(),
]);

/****** Task validation end ******/

module.exports = {
  withValidationErrors,
  validateSignUpInput,
  validateLoginInput,
  validateUserUpdate,
  validateColorIdParam,
  validateColorUpdate,
  validateSettingIdParam,
  validateSettingUpdate,
  validateTaskCreate,
  validateTaskIdParam,
  validateTaskUpdate,
};
