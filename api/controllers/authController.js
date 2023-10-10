import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import People from "../models/People.js";
import { errorHandler } from "../utils/error.js";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await People.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    console.log("password", validPassword);
    if (!validPassword) return next(errorHandler(404, "Wrong credential!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRECT);

    //to remove passport distrac the passowrd form obj and use _doc to. othewise won't work
    const { password: pass, ...rest } = validUser._doc;

    //if we want to use, can use expires:and cookie expire limit in res.cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
