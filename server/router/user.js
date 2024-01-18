const express = require("express");
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controller/User");
const {
  validateRegisterInput,
} = require("../middleware/validation.middleware");
const userRouter = express.Router();

// get all user
userRouter.get("/all", getAllUsers);

// get for viewing the profile
// patch for changing the profile
// delete for deleting the user
userRouter.route("/").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = userRouter;
