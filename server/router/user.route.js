const express = require("express");

// controller
const userCtrl = require("../controller/user.controller");

// middleware
const validMiddle = require("../middleware/validation.middleware");
const authMiddle = require("../middleware/auth.middleware");

const userRouter = express.Router();

// get all user
userRouter.route("/list").get(userCtrl.getAllUsers);

// get for viewing the profile
// post for creating new user
userRouter
  .route("/")
  .get(authMiddle.requireSignIn, userCtrl.getUser)
  .post(validMiddle.validateSignUpInput, userCtrl.createUser);

// delete for deleting the user
// patch for changing the profile
userRouter
  .route("/:id")
  .get(authMiddle.requireSignIn, userCtrl.getUser)
  .patch(
    authMiddle.requireSignIn,
    authMiddle.hasAuthorization,
    validMiddle.validateUserUpdate,
    userCtrl.updateUser
  )
  .delete(
    authMiddle.requireSignIn,
    authMiddle.hasAuthorization,
    userCtrl.deleteUser
  );

userRouter.param("id", userCtrl.userById);

module.exports = userRouter;
