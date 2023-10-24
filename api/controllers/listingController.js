import Listing from "../models/Listing.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error.message);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(401, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(404, "You can only delete your own Listing"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(201).json("Listing has been deleted");
  } catch (error) {
    next(error.message);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(401, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(404, "You can only delete your own Listing"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, //if not use then will get previous info not updated one
      }
    );
    res.status(201).json(updatedListing);
  } catch (error) {
    next(error.message);
  }
};
