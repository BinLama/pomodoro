const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { hashIt } = require("../utils/hash");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    hash_pw: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("hash_pw", hashIt(value));
      },
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
