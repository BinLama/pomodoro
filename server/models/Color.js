const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Color = sequelize.define(
  "color",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "light",
    },
  },
  {
    tableName: "color",
    timestamps: false,
  }
);

module.exports = Color;
