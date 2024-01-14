const { createServer } = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

// constant values
const PORT = process.env.PORT || 5000;
const app = createServer();

// start function
const start = async () => {
  try {
    // await dbStart();
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log("authenticated");
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the databse:", error);
  }
};

start();
