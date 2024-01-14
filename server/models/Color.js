"use strict";

module.exports = (sequelize, DataTypes) => {
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
    }
  );

  return Color;
};
