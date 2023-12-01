// database
const sequelize = require("../db/db");

// db models
const { User, signup, login } = require("./User");
const Setting = require("./Setting");
const Color = require("./Color");
const Task = require("./Task");
const Session = require("./Session");

// authenticate the database
const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error(`Unable to connect to the database: ${error.message}`);
  }
};

// sync the models
const syncModels = async () => {
  try {
    // alter is true cause model is changing
    await sequelize.sync();
    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Error syncing models with the database:", error);
    throw new Error(`Error syncing models with the database: ${error.message}`);
  }
};

// create models associations
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

const dbStart = async () => {
  try {
    await authenticateDatabase();
    makeConnection();
    console.log("Create Model Connection");
    await syncModels();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sequelize,
  dbStart,
  User,
  signup,
  login,
  Setting,
  Session,
  Color,
  Task,
};
