"use strict";
const { QueryTypes } = require("sequelize");

// code base from: https://dev.to/shoki/how-to-update-the-database-after-a-drag-and-drop-operation-27dc

const { sequelize } = require("../models");
const {
  POSITION_ADD_INCREMENT,
  POSITION_UPDATE_NUMBER,
} = require("./constants");

const getTaskPoistions = async () => {
  try {
    const maxPosition = await sequelize.query(
      "SELECT IFNULL((SELECT position FROM tasks ORDER BY position DESC LIMIT 1), 0) as max_position",
      { type: QueryTypes.SELECT }
    );
    return { result: maxPosition };
  } catch (error) {
    throw new Error(`Max Position error: ${error.message}`);
  }
};

const getTaskOrderedByPosition = async () => {
  try {
    const allTasks = await sequelize.query(
      `SELECT *, ROW_NUMBER() OVER (ORDER BY position) as orderedData FROM tasks`,
      { type: QueryTypes.SELECT }
    );
    return { result: allTasks };
  } catch (error) {
    throw new Error(`Getting tasks with order failed: ${error.message}`);
  }
};

const updateSinglePosition = async (task) => {
  try {
    const singleTaskUpdate = await sequelize.query(
      "UPDATE tasks SET position = :orderPosition *1024 where id = :id",
      {
        replacements: { orderPosition: task.orderedData, id: task.id },
        type: QueryTypes.UPDATE,
      }
    );
    return { result: singleTaskUpdate };
  } catch (error) {
    throw new Error(`New position update failed: ${error.message}`);
  }
};

const createNewPositions = async () => {
  const prevMaxPosition = (await getTaskPoistions()).result;
  const newPosition = prevMaxPosition[0].max_position + POSITION_ADD_INCREMENT;

  return newPosition;
};

const updatedPosition = (prevElPosition, nextElPosition) => {
  let currElPosition;

  // prevElPosition === undefined then I know that it is being added to the top of the task
  // set the postion to nextElPosition + 512;
  if (prevElPosition || nextElPosition) {
    if (prevElPosition === undefined) {
      console.log("pre: und");
      currElPosition = nextElPosition - POSITION_UPDATE_NUMBER;

      // nextElPosition === undefined then I know that it is being added to the end of the task
      // set the postion to prevElPosition + 512;
    } else if (nextElPosition === undefined) {
      console.log("nxt: und");

      currElPosition = prevElPosition + POSITION_UPDATE_NUMBER;
    }
    // if there are both tasks available then just get the average.
    else {
      console.log("mid");

      currElPosition = Math.floor((nextElPosition + prevElPosition) / 2);
    }
    return { update: true, position: currElPosition };
  }

  return { update: false };
};

const checkIfOverlap = async (
  currElPosition,
  prevElPosition,
  nextElPosition
) => {
  if (
    Math.abs(currElPosition - prevElPosition) <= 1 ||
    Math.abs(currElPosition - nextElPosition) <= 1
  ) {
    const { result: allTasks } = await getTaskOrderedByPosition();
    console.log("OVERLAP", allTasks);

    try {
      await Promise.all(
        allTasks.map(async (task) => {
          await updateSinglePosition(task);
        })
      );
    } catch (error) {
      throw new Error(`Updating position failed: ${error.message}`);
    }
  }
};

module.exports = {
  getTaskPoistions,
  createNewPositions,
  updatedPosition,
  checkIfOverlap,
};
