// core functionality imports
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// db models
const { dbStart } = require("./models/index");
// constant values
const PORT = process.env.PORT || 5000;

// express middle routers
const { userRouter } = require("./router/user");
const { authRouter } = require("./router/auth");

// express middlewares
app.use(express.json());

app.use("/api/v1/", authRouter);
app.use("/api/v1/user", userRouter);

const start = async () => {
  try {
    // await sequelize.authenticate();
    await dbStart();
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
      console.log("authenticated");
    });
  } catch (error) {
    console.error("Unable to connect to the databse:", error);
  }
};

start();
