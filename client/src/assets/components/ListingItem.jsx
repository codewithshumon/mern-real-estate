import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white flex flex-col justify-between gap-2 shadow-md transition-shadow hover:shadow-slate-400 hover:shadow-lg mt-7 overflow-hidden rounded-lg w-full md:min-w-[30%] md:max-w-[31%] transform duration-200">
      <Link to={`/listing/${listing._id}`}>
        <div>
          <img
            src={listing.imageUrls[0]}
            alt="listing cover"
            className="h-[320px md:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
          <div className="p-4 flex flex-col gap-2">
            <p className="text-lg font-semibold text-slate-700 truncate">
              {listing.title}
            </p>
            <div className="flex items-center gap-2">
              <MdLocationOn className="h-5 w-5 text-green-700" />
              <p className="text-green-700 text-sm truncate">
                {listing.address}
              </p>
            </div>
            <p className="line-clamp-2 text-slate-700 text-sm ">
              {listing.description}
            </p>
            <div className="flex gap-2">
              <p className="font-semibold text-xl">
                $
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
              </p>
              <span className="text-sm text-slate-700 self-center font-semibold">
                {listing.type === "rent" && "/ Month"}
              </span>
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="font-bold text-xs text-slate-700">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </div>
              <div className="font-bold text-xs text-slate-700">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </div>
              <div className="font-bold text-xs text-slate-700">
                {listing.parking ? (
                  `Parking space`
                ) : (
                  <span className="text-red-700">No Parking</span>
                )}
              </div>
              <div className="font-bold text-xs text-slate-700">
                {listing.furnished ? (
                  `Furnished`
                ) : (
                  <span className="text-red-700">Unfurnished</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

//wen we send props and recived at componet wen need to do that
ListingItem.propTypes = {
  listing: PropTypes.any.isRequired,
};
