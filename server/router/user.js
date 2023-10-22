const express = require("express");
const {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../controller/User");
const requireAuth = require("../middleware/requireAuth");

const userRouter = express.Router();

// require auth for all user routes
userRouter.use(requireAuth);

// get all user
userRouter.get("/all", getAllUsers);

// get for viewing the profile
// patch for changing the profile
// delete for deleting the user
userRouter.route("/").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = { userRouter };
