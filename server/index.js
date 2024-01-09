const { createServer } = require("./app");
const { dbStart } = require("./models/index");
require("dotenv").config();

// constant values
const PORT = process.env.PORT || 5000;
const app = createServer();

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
