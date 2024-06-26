const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    "setting",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      studyTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 25,
      },
      relaxTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      longRelaxTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15,
      },
      customStudyTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },
      customRelaxTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 6,
      },
      customLongRelaxTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      maxPomodoroSession: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      longRelaxInterval: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
      autoBreak: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      autoStudy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      studyStartSound: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "digital_alarm",
      },
      restStartSound: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "key_chimes",
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "standard",
      },
      mute: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "settings",
      freezeTableName: true,
    }
  );

  return Setting;
};
