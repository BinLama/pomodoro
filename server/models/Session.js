const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Session = sequelize.define(
  "sessions",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "session",
  }
);

module.exports = Session;
