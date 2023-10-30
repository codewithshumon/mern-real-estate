import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//this is only importing form deploy or production to "render.com website"
import path, { dirname } from "path";

//enternal export
import userRouter from "./routes/userRoute.js"; //when we export default can change the name
import authRouter from "./routes/authRoute.js";
import listingRouter from "./routes/listingRoute.js";

//this is only importing form deploy or production to "render.com website"
const _dirname = path.resolve();

const app = express();

//.env file config
dotenv.config();

///body parser config
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/listing", listingRouter);

//this blow code must write to after these [app.use("/api/user","/api/auth","/api/listing")]
//this is only importing form deploy or production to "render.com website"
//here if we use create-react-app it will 'client/build' or vite 'client/dist'
app.use(express.static(path.join(_dirname, "/client/dist")));
// here '*' means any address that is not between["/api/user","/api/auth","/api/listing"] then it will run "index.html inside the client folder"
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

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
