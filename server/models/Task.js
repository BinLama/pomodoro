"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
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
      freezeTableName: true,
    }
  );

  Task.associate = function (models) {
    // associations can be defined here
    Task.user = Task.belongsTo(models.user, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Task;
};
