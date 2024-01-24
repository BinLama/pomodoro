const express = require("express");

// controller
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");

const taskRouter = express.Router();

// get all task
taskRouter.route("/").get(getAllTask).post(createTask);
taskRouter.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = taskRouter;
