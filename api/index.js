const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

//.env file config
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database estate connected!");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server started at 5000");
});
