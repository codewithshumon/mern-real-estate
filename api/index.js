import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

//enternal export
import userRouter from "./routes/userRoute.js"; //when we export default can change the name
import authRouter from "./routes/authRoute.js";

//.env file config
dotenv.config();

///body parser config
app.use(express.json());

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
app.use("/api/auth", authRouter);

//error middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
