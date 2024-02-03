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
const Task = models.task;

/**
 * get all task that I have
 *
 * @param {object} req
 * @param {object} req
 *
 * @return {object} returns a list of all tasks
 */
const getAllTask = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const tasks = await Task.findAll({
      where: {
        userId,
      },
      order: [["position"]],
    });

    return res
      .status(StatusCodes.OK)
      .json({ status: STATUS.SUCCESS, task: tasks });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
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
const createTask = async (req, res) => {
  try {
    const { id: userId } = req.user;
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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Task creation failed" });
    }

    res.status(StatusCodes.OK).json({
      msg: "task created",
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
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
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    // const prevElPosition = req.body.prevElPosition;
    // const nextElPosition = req.body.nextElPosition;
    // const newPosition = updatedPosition(prevElPosition, nextElPosition);

    const newTask = { ...req.body };
    delete newTask.position;

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
      msg: "task updated",
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
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
const updateTaskPosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

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
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
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
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await Task.destroy({
      where: {
        id,
        userId,
      },
    });

    res.status(StatusCodes.OK).json({
      task: `Task with id: ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message, error: "Internal Server Error" });
  }
};
module.exports = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskPosition,
};
