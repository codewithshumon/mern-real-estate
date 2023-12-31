import bcrypt from "bcrypt";
import People from "../models/People.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/Listing.js";

export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

export const updateUser = async (req, res, next) => {
  //here we're getting user from token verifyUser.js
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Can not update"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await People.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      //if we do not use new:true then bowser response will show the provious info
      //--not the updated ino
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  //here we're getting user from token verifyUser.js
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "Can not delete"));

  try {
    await People.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  //here we're getting user from token verifyUser.js
  if (req.user.id === req.params.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You are not authorize"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await People.findById(req.params.id);

    if (!user) return next(errorHandler("User not found"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
