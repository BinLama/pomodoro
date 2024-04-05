const express = require("express");

// controller
const userCtrl = require("../controller/user.controller");

// middleware
const validMiddle = require("../middleware/validation.middleware");
const authMiddle = require("../middleware/auth.middleware");

const userRouter = express.Router();

// get all user
userRouter.get("/list", userCtrl.getAllUsers);

// get for viewing the profile
// post for creating new user
// delete for deleting the user
// patch for changing the profile
userRouter
  .route("/")
  .get(authMiddle.validateTokenAndGetUser, userCtrl.getUser)
  .post(validMiddle.validateSignUpInput, userCtrl.createUser)
  .delete(authMiddle.validateTokenAndGetUser, userCtrl.deleteUser)
  .patch(
    authMiddle.validateTokenAndGetUser,
    validMiddle.validateUserUpdate,
    userCtrl.updateUser
  );

module.exports = userRouter;
