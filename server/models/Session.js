"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "session",
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
      tableName: "sessions",
    }
  );

  return Session;
};
