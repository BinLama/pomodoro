"use strict";
const { hashIt } = require("../utils/hash");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("password", hashIt(value));
        },
      },
    },
    {
      tableName: "users",
      freezeTableName: true,
    }
  );

  User.associate = (models) => {
    User.setting = User.hasOne(models.setting, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    // User.hasOne(models.Color, {
    //   foreignKey: "userId",
    //   onDelete: "CASCADE",
    // });
    User.task = User.hasMany(models.task, {
      // foreignKey: "userId",
      // onDelete: "CASCADE",
    });
    // User.hasMany(models.Session, {
    //   foreignKey: "userId",
    //   onDelete: "CASCADE",
    // });
  };
  return User;
};
