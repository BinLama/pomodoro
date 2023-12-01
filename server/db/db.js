const dbConfig = require("../config/dbConfig");

const { Sequelize } = require("sequelize");
require("dotenv").config();

const env = process.env.NODE_ENV || "test";
const config = dbConfig[env];

const { database, username, password, host, port, dialect } = config;

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
