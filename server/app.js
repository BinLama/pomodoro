// core functionality imports
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// db initialized
const sequelize = require("./db/db");

// db models
const DB_Model = require("./models/index");
// constant values
const PORT = process.env.PORT || 5000;

// express middle routers
const { userRouter } = require("./router/user");

// express middlewares

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await DB_Model();
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
      console.log("authenticated");
    });
  } catch (error) {
    console.error("Unable to connect to the databse:", error);
  }
};

start();
