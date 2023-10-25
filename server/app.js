// core functionality imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");

// express middle routes
const userRoutes = require("./router/user");
const authRoutes = require("./router/auth");
const taskRoutes = require("./router/task");
const settingRoutes = require("./router/setting");
const sessionRoutes = require("./router/session");
const colorRoutes = require("./router/color");

// express middlewares
app.use(express.json());

// remove this on production
app.use(morgan("tiny"));

app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/api/v1", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/setting", settingRoutes);
app.use("/api/v1/session", sessionRoutes);
app.use("/api/v1/color", colorRoutes);

module.exports = { app };
