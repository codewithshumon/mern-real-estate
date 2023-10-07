import bcrypt from "bcrypt";
import People from "../models/People.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  //here we don't need to use await because of hashSync it work the same
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new People({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json("User created succesfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
