const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Setting = sequelize.define(
  "setting",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    study_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 25,
    },
    relax_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    long_relax_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    max_pomodoro_session: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    long_relax_interval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
    },
    break_end_reminder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    study_end_reminder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    auto_break: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    auto_study: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    study_start_sound: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "digital_alarm",
    },
    rest_start_sound: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "key_chimes",
    },
  },
  {
    tableName: "settings",
  }
);

module.exports = Setting;
