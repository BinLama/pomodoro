import express, { Application } from "express";
require("dotenv").config();

const app: Application = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
