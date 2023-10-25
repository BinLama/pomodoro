const { Sequelize } = require("sequelize");
require("dotenv").config();
console.log(process.env.TEST_DB_NAME);

const sequelize = new Sequelize(
  process.env.TEST_DB_NAME,
  process.env.TEST_DB_USER,
  process.env.TEST_DB_PASSWORD,
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    // logging: (...msg) => console.log(msg),
  },
  {
    define: {
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;
