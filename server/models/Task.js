const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
  }
);

module.exports = Task;
