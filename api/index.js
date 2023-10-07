import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

//enternal export
import userRouter from "./routes/userRoute.js"; //when we export default can change the name

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

app.use("/api/user", userRouter);
