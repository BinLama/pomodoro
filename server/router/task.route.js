const express = require("express");

// controller
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");
const {
  validateTaskCreate,
  validateTaskIdParam,
  validateTaskUpdate,
} = require("../middleware/validation.middleware");

const taskRouter = express.Router();

// get all task
taskRouter.route("/").get(getAllTask).post(validateTaskCreate, createTask);
taskRouter
  .route("/:id")
  .patch(validateTaskIdParam, validateTaskUpdate, updateTask)
  .delete(validateTaskIdParam, deleteTask);

module.exports = taskRouter;
