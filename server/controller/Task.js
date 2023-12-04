const { Task } = require("../models/index");
const { STATUS } = require("../utils/constants");
const {
  createNewPositions,
  updatedPosition,
  checkIfOverlap,
} = require("../utils/ranking");
const { removeKeyEndsWith } = require("../utils/removeKey");

const getAllTask = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const tasks = await Task.findAll({
      where: {
        UserId: id,
      },
      order: [["position"]],
    });

    if (!tasks) {
      return res.status(404).json({
        status: STATUS.ERROR,
        error: `No tasks for user with id: ${id}`,
      });
    }
    return res.status(200).json({ status: STATUS.SUCCESS, task: tasks });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

// create task
const createTask = async (req, res) => {
  try {
    const { id: UserId } = req.user;
    const { title, note } = req.body;

    // gettting the new available position number
    const newTaskPosition = await createNewPositions();

    const newTask = await Task.create({
      title,
      note,
      UserId: UserId,
      position: newTaskPosition,
    });

    // task failed
    if (!newTask) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, error: "Task creation failed" });
    }

    // destructor for things we need
    const {
      id,
      completed,
      note: taskNote,
      title: taskTitle,
      position,
    } = newTask;

    res.status(200).json({
      status: STATUS.SUCCESS,
      task: { id, completed, title: taskTitle, note: taskNote, position },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

// edit task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.user;

    const prevElPosition = req.body.prevElPosition;
    const nextElPosition = req.body.nextElPosition;
    const newPosition = updatedPosition(prevElPosition, nextElPosition);

    const task = await Task.findOne({
      where: {
        id,
        UserId,
      },
    });

    if (!task) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, error: `No task with id: ${id}` });
    }

    console.log(req.body);
    removeKeyEndsWith(req.body, "Position");

    let newData = undefined;
    if (newPosition.update) {
      newData = { ...req.body, position: newPosition.position };
    } else {
      newData = { ...req.body };
    }

    const updatedNewtask = await task.update(newData);

    // check if index overLaps
    if (newPosition.update) {
      await checkIfOverlap(
        newPosition.position,
        prevElPosition,
        nextElPosition
      );
    }

    const {
      id: updatedTaskId,
      completed,
      note: taskNote,
      title: taskTitle,
      position,
    } = updatedNewtask;

    res.status(200).json({
      status: STATUS.SUCCESS,
      task: {
        id: updatedTaskId,
        completed,
        title: taskTitle,
        note: taskNote,
        position,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.user;
    console.log(id, UserId);

    const task = await Task.findOne({
      where: {
        id,
        UserId,
      },
    });

    if (!task) {
      return res
        .status(404)
        .json({ status: STATUS.ERROR, error: `No task with id: ${id}` });
    }

    await task.destroy({ force: true });

    res.status(200).json({
      status: STATUS.SUCCESS,
      task: `Task with id: ${id} has been successfully deleted.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: STATUS.ERROR, error: "Internal Server Error" });
  }
};
module.exports = { getAllTask, createTask, updateTask, deleteTask };
