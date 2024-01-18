const express = require("express");
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/Task");
const requireAuth = require("../middleware/auth.middleware");

const taskRouter = express.Router();

// require auth for all task route
taskRouter.use(requireAuth);

// get all task
taskRouter.route("/").get(getAllTask).post(createTask);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = taskRouter;
