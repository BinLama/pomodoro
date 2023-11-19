const dbConfig = require("../config/dbConfig");

const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionType = process.env.NODE_ENV || "test";

const { database, username, password, host, port, dialect } =
  dbConfig[connectionType];

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

module.exports = sequelize;
