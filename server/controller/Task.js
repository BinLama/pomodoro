const { Task } = require("../models/index");

const getAllTask = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const tasks = await Task.findAll({
      where: {
        UserId: id,
      },
    });

    if (!tasks) {
      return res.status(404).json({ error: `No tasks with id: ${id}` });
    }
    return res.status(200).json({ task: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create task
const createTask = async (req, res) => {
  try {
    const { id: UserId } = req.user;
    const { task } = req.body;

    const newTask = await Task.create({
      task,
      UserId: UserId,
    });

    if (!newTask) {
      return res.status(404).json({ error: "Task creation failed" });
    }

    res.status(200).json({ task: newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// edit task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: UserId } = req.user;

    const task = await Task.findOne({
      where: {
        id,
        UserId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: `No task with id: ${id}` });
    }

    const updatedNewtask = await task.update(req.body);

    res.status(200).json({ task: updatedNewtask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: `No task with id: ${id}` });
    }

    await task.destroy({ force: true });

    res
      .status(200)
      .json({ task: `Task with id: ${id} has been successfully deleted.` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getAllTask, createTask, updateTask, deleteTask };
