const express = require("express");

// controller
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controller/User");

// middleware
const requireAuth = require("../middleware/auth.middleware");
const { validateUpdateInput } = require("../middleware/validation.middleware");

const userRouter = express.Router();

// only logged in user can access this
userRouter.use(requireAuth);

// get all user
userRouter.get("/all", getAllUsers);

// get for viewing the profile
// delete for deleting the user
// patch for changing the profile
userRouter
  .route("/")
  .get(getUser)
  .delete(deleteUser)
  .patch(validateUpdateInput, updateUser);

module.exports = userRouter;
