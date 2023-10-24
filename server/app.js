// core functionality imports
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// db models
const { dbStart } = require("./models/index");

// constant values
const PORT = process.env.PORT || 5000;

// express middle routes
const userRoutes = require("./router/user");
const authRoutes = require("./router/auth");
const taskRoutes = require("./router/task");
const settingRoutes = require("./router/setting");
const sessionRoutes = require("./router/session");
const colorRoutes = require("./router/color");

// express middlewares
app.use(express.json());

// routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/setting", settingRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/color", colorRoutes);

// start function
const start = async () => {
  try {
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
