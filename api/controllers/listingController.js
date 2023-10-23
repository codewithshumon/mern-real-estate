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

  console.log("api listing", listing);

  if (!listing) {
    return next(errorHandler(401, "Listing not found"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(404, "You can only delete your own Listing"));
  }
  try {
    console.log("try", listing);
    await Listing.findByIdAndDelete(req.params.id);
    res.status(201).json("Listing has been deleted");
  } catch (error) {
    console.log("error", error);
    next(error.message);
  }
};
