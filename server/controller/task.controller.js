const { STATUS } = require("../utils/constants");
const {
  createNewPositions,
  updatedPosition,
  checkIfOverlap,
} = require("../utils/ranking");
const { removeKeyEndsWith } = require("../utils/removeKey");

// models
const models = require("../models");
const { StatusCodes } = require("http-status-codes");
const { InternalError, NotFoundError } = require("../errors/customErrors");
const Task = models.task;

/**
 * get all task that I have
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} returns a list of all tasks
 */
const getAllTask = async (req, res, next) => {
  try {
    const { id: userId } = req.auth;

    const tasks = await Task.findAll({
      where: {
        userId,
      },
      order: [["position"]],
    });

    if (!tasks) {
    }
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    const err = new InternalError(`Error getting all tasks: ${error.message}`);

    next(err);
  }
};

/**
 * get single task
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} returns a list of all tasks
 */
const getSingleTask = async (req, res, next) => {
  try {
    const task = req.task;

    return res.status(StatusCodes.OK).json({ task: task });
  } catch (error) {
    const err = new InternalError(`Error getting user: ${error.message}`);

    next(err);
  }
};

/**
 * create a new task with it's position auto populated.
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} returns task created message
 */
const createTask = async (req, res, next) => {
  try {
    const { id: userId } = req.auth;
    const { title, note } = req.body;

    // gettting the new available position number
    // const newTaskPosition = await createNewPositions();

    const newTask = await Task.create({
      title,
      note: note || "",
      userId,
      position: 0, // change the position to be based on the new task position
    });

    // task failed
    if (!newTask) {
      const err = new NotFoundError("Task creation failed");
      return next(err);
    }

    res.status(StatusCodes.CREATED).json(newTask);
  } catch (error) {
    const err = new InternalError(
      `Error during task creation: ${error.message}`
    );

    next(err);
  }
};

/**
 * update the task based on it's id
 * except it's position
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} return msg task updated
 */
const updateTask = async (req, res, next) => {
  console.log("got to update");
  try {
    // const { id } = req.params;
    // const { id: userId } = req.auth;

    // const prevElPosition = req.body.prevElPosition;
    // const nextElPosition = req.body.nextElPosition;

    // console.log(`Prev El Position: ${prevElPosition}`);
    // console.log(`Next El Position: ${nextElPosition}`);

    const task = req.task;

    // const newPosition = updatedPosition(prevElPosition, nextElPosition);

    const data = { ...req.body };
    // delete data.position;

    // removeKeyEndsWith(req.body, "Position");

    // let newData = undefined;
    // if (newPosition.update) {
    //   newData = { ...req.body, position: newPosition.position };
    // } else {
    //   newData = { ...req.body };
    // }

    const newTask = await task.update(data);

    // check if index overLaps
    // if (newPosition.update) {
    //   await checkIfOverlap(
    //     newPosition.position,
    //     prevElPosition,
    //     nextElPosition
    //   );
    // }

    res.status(StatusCodes.OK).json(newTask);
  } catch (error) {
    const err = new InternalError(`Error during task update: ${error.message}`);

    next(err);
  }
};

/**
 * update the task based on it's id
 * but update only it's position (used for drag and drop)
 * TODO: need to implement the position calculation
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} return updated task
 */
const updateTaskPosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.auth;

    // const prevElPosition = req.body.prevElPosition;
    // const nextElPosition = req.body.nextElPosition;
    // const newPosition = updatedPosition(prevElPosition, nextElPosition);

    const newTask = { ...req.body };
    // delete newTask.position;

    // removeKeyEndsWith(req.body, "Position");

    // let newData = undefined;
    // if (newPosition.update) {
    //   newData = { ...req.body, position: newPosition.position };
    // } else {
    //   newData = { ...req.body };
    // }

    await Task.update(newTask, {
      where: {
        id,
        userId,
      },
    });

    // check if index overLaps
    // if (newPosition.update) {
    //   await checkIfOverlap(
    //     newPosition.position,
    //     prevElPosition,
    //     nextElPosition
    //   );
    // }

    res.status(StatusCodes.OK).json({
      msg: "task position updated",
    });
  } catch (error) {
    const err = new InternalError(
      `Error during task position update: ${error.message}`
    );

    next(err);
  }
};

/**
 * delete the task based on it's id
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} return msg task deleted.
 */
const deleteTask = async (req, res, next) => {
  try {
    const task = req.task;

    await task.destroy();

    res.status(StatusCodes.OK).json({
      task: `Task with id: ${task.id} has been successfully deleted.`,
    });
  } catch (error) {
    const err = new InternalError(`Error during task delete: ${error.message}`);

    next(err);
  }
};

module.exports = {
  getAllTask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskPosition,
};
