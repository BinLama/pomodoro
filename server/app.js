// core functionality imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");

// routers
const userRoutes = require("./router/user.route");
const authRoutes = require("./router/auth.route");
const taskRoutes = require("./router/task.route");
const settingRoutes = require("./router/setting.route");
const sessionRoutes = require("./router/session.route");
const colorRoutes = require("./router/color.route");

// middleware
const authMiddle = require("./middleware/auth.middleware");
const errorHandlerMiddleware = require("./middleware/errorHandler.middleware");

function createServer() {
  // express middlewares
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // remove this on production
  app.use(morgan("tiny"));

  // TODO: remove this
  app.use(cors({ origin: true, credentials: true }));

  // remove x-powered-by header to identify express run app
  app.disable("x-powered-by");

  // routes
  app.get("/", (_, res) => {
    res.status(200).json({ msg: "this is a server..." });
  });
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/task", authMiddle.requireSignIn, taskRoutes);
  app.use("/api/v1/setting", authMiddle.requireSignIn, settingRoutes);
  app.use("/api/v1/session", authMiddle.requireSignIn, sessionRoutes);
  app.use("/api/v1/color", authMiddle.requireSignIn, colorRoutes);
  app.use("/api/v1/auth", authRoutes);

  // error handler
  app.use(errorHandlerMiddleware);

  return app;
}

module.exports = { createServer };
