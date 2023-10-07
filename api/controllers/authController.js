import bcryptjs from "bcryptjs";
import People from "../models/People.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new People({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    console.log("user model work");
    res.status(201).json("User created successfully!");
  } catch (error) {
    console.log("error for user", error);
    next(error);
  }
};
