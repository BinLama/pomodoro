// core functionality imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const morgan = require("morgan");

// routers
const userRoutes = require("./router/user");
const authRoutes = require("./router/auth.route");
const taskRoutes = require("./router/task");
const settingRoutes = require("./router/setting");
const sessionRoutes = require("./router/session");
const colorRoutes = require("./router/color");

// middleware
const authenticateUser = require("./middleware/auth.middleware");
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
  app.use("/api/v1/user", authenticateUser, userRoutes);
  app.use("/api/v1/task", taskRoutes);
  app.use("/api/v1/setting", settingRoutes);
  app.use("/api/v1/session", sessionRoutes);
  app.use("/api/v1/color", colorRoutes);
  app.use("/api/v1/auth", authRoutes);

  // error handler
  app.use(errorHandlerMiddleware);

  return app;
}

module.exports = { createServer };
