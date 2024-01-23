const express = require("express");

// controller
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controller/User");

// middleware
const { validateUserUpdate } = require("../middleware/validation.middleware");

const userRouter = express.Router();

// get all user
userRouter.get("/all", getAllUsers);

// get for viewing the profile
// delete for deleting the user
// patch for changing the profile
userRouter
  .route("/")
  .get(getUser)
  // .delete(deleteUser)
  .patch(validateUserUpdate, updateUser);

module.exports = userRouter;
