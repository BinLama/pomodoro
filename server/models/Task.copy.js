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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    position: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "tasks",
  }
);

module.exports = Task;
