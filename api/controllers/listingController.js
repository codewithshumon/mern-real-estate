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

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    res.status(201).json(listing);
  } catch (error) {
    next(error.message);
  }
};

export const searchListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const offer = parseInt(req.query.offer);
    //here offer value could be fales/true/undefined.
    //we are searching if offer value is "false" we need "offer= true& false" both listing
    //we can use undefine with qoute "undefined" or without qoute undefined
    if (offer === "undefined" || offer === "false")
      offer = { $in: [true, false] };

    const furnished = parseInt(req.query.furnished);
    //here furnished value could be fales/true/undefined.
    //same here if furnished value is "false" we need "furnished= true& false" both listing
    if (furnished === undefined || furnished === "false")
      furnished = { $in: [true, false] };

    const parking = parseInt(req.query.parking);

    //we can use undefine with qoute "undefined" or without qoute undefined
    if (parking === "undefined" || parking === "false")
      parking = { $in: [true, false] };

    const type = parseInt(req.query.type);
    //here type value could be sale/rent/undefined/all.
    //same here if type value is "undefine or all" we need "type= sale & rent" listing
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    //if there is not 'searchTerm and order" then we will use "createdAt and descending"
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      title: { $regex: searchTerm, $options: "i" },
    })
      .sort({
        //here sort means how it will sort listing data
        [sort]: order,
      })
      .limit(limit) //here limit means how many data will show in search result per page
      .skip(startIndex);
    //here skip means here how many data will be not shown in search. Like here if startIndex is 0 then it start show from the begening but startIndex is 1, 2 or more then it will skipe "the amount (number) of data/listing that set to limit" like here default limit is 9. if startIndex is 1 then it will skip first 9 data/listing from shown

    res.status(200).json(listing);
  } catch (error) {
    next(error.message);
  }
};
