const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
  test: {
    database: process.env.TEST_DB_DATABASE,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: "mysql",
    logging: (...msg) => console.log(msg),
  },
  production: {
    database: process.env.PRODUCTION_DB_DATABASE,
    username: process.env.PRODUCTION_DB_USER,
    password: process.env.PRODUCTION_DB_PASSWORD,
    host: process.env.PRODUCTION_DB_HOST,
    port: process.env.PRODUCTION_DB_PORT,
    dialect: "mysql",
  },
};
