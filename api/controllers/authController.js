import bcrypt from "bcrypt";
import People from "../models/People.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //if we use hashSync then don't need to use await it work the same
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new People({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
