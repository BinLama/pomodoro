"use strict";
const usersInfo = require("../data.json");
const models = require("../models");
const User = models.user;
const Setting = models.setting;
const Color = models.color;
const Task = models.task;
const Session = models.session;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Ensuring associations are set up
      makeConnection();

      // Check for existing users based on a unique constraint (e.g., email)
      const existingUsers = await User.findAll({
        where: { email: usersInfo.map((user) => user.email) },
      });

      const existingEmails = existingUsers.map((user) => user.email);

      // Filter out duplicates from the data to be inserted
      const newData = usersInfo.filter(
        (user) => !existingEmails.includes(user.email)
      );

      // Insert new data
      await User.bulkCreate(newData, {
        include: [
          { model: User.associations.setting.target },
          { model: User.associations.color.target },
          { model: User.associations.tasks.target },
          { model: User.associations.sessions.target },
        ],
      });
    } catch (error) {
      console.error("Error during migration 'up':", error);
      throw error; // Rethrow the error to indicate the migration failed
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      for (const userData of usersInfo) {
        const user = await User.findOne({
          where: { email: userData.email },
        });

        if (user) {
          await user.destroy();
        } else {
          console.warn(
            `User with email ${userData.email} not found during migration 'down'`
          );
        }
      }
    } catch (error) {
      console.error("Error during migration 'down':", error);
      throw error; // Rethrow the error to indicate the migration failed
    }
  },
};

// Your makeConnection function as before
const makeConnection = () => {
  try {
    // One to One User and Setting
    User.setting = User.hasOne(Setting, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Setting.belongsTo(User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    // One to One User and Color
    User.color = User.hasOne(Color, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Color.belongsTo(User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    // One to Many User and Task (many task)
    User.tasks = User.hasMany(Task, {
      onDelete: "CASCADE",
    });
    Task.belongsTo(User, {
      onDelete: "CASCADE",
    });

    // One to many User and Session (many Session)
    User.sessions = User.hasMany(Session, {
      onDelete: "CASCADE",
    });
    Session.belongsTo(User, {
      onDelete: "CASCADE",
    });

    // Assign instances to the User Model
    User.associations.setting = User.setting;
    User.associations.color = User.color;
    User.associations.tasks = User.tasks;
    User.associations.sessions = User.sessions;
  } catch (error) {
    console.error("Error creating association:", error);
    throw new Error(`Error creating association: ${error.message}`);
  }
};
