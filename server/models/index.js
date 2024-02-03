"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";

console.log(`ENV: ${env}`);

const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config.js")[env];
const { database, username, password, host, port, dialect } = config;
const db = {};

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  port,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
    acquire: 60000,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// describing associations
const makeConnection = () => {
  const {
    user: User,
    setting: Setting,
    task: Task,
    color: Color,
    session: Session,
  } = db;
  try {
    // One to One user and Setting
    User.setting = User.hasOne(Setting, {
      onDelete: "CASCADE",
    });
    Setting.user = Setting.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // One to Many user and Task (many task)
    User.tasks = User.hasMany(Task, {
      onDelete: "CASCADE",
    });
    Task.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // One to One User and Color
    User.color = User.hasOne(Color, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Color.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // One to many User and Session (many Session)
    User.sessions = User.hasMany(Session, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Session.belongsTo(User, {
      foreignKey: "userId",
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

makeConnection();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
