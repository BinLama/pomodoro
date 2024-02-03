"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Creating a settings table
     */
    await queryInterface.createTable("settings", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("settings");
  },
};
