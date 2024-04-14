const express = require("express");

// controller
const taskCtrl = require("../controller/task.controller");

const validMiddle = require("../middleware/validation.middleware");

const taskRouter = express.Router();

// get all task
taskRouter
  .route("/")
  .get(taskCtrl.getAllTask)
  .post(validMiddle.validateTaskCreate, taskCtrl.createTask);

taskRouter
  .route("/:id")
  .get(taskCtrl.getSingleTask)
  .patch(
    validMiddle.validateTaskIdParam,
    validMiddle.validateTaskUpdate,
    taskCtrl.updateTask
  )
  .delete(validMiddle.validateTaskIdParam, taskCtrl.deleteTask);

taskRouter.post(
  "/position/:id",
  validMiddle.validateTaskIdParam,
  taskCtrl.updateTaskPosition
);

module.exports = taskRouter;
