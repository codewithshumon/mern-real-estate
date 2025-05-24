import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../assets/components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [listing, setListing] = useState(null); // Use square brackets for destructuring
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
          method: "GET",
        });

        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setError(true);

          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
    // Pass an empty dependency [] array to run this effect only once
  }, [params.listingId]); // Passing [params.listingId] to run effect when listingId changes

  return (
    <main>
      {loading && (
        <p className="text-2xl text-center my-5 font-semibold">Loading...</p>
      )}
      {error && (
        <p className="text-2xl text-center my-5 text-red-700 font-semibold">
          Something went wrong
        </p>
      )}
      {listing && !loading && !error && (
        <div className="mx-5 md:mx-20">
          <Swiper navigation pagination={{ clickable: true }}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="relative h-[400px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[15%] right-[8%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[24%] right-[8%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-4 gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-3xl font-bold text-slate-700">
                {/* here added "- $" means "house title - $.2500.00"*/}
                {listing.title}
              </p>
              <p className="text-2xl font-bold">
                $
                {listing.offer
                  ? listing.discountPrice.toLocaleString("en-US")
                  : listing.regularPrice.toLocaleString("en-US")}
                {listing.type === "rent" && " / Month"}
              </p>
            </div>
            <p className="flex items-center mt-2 gap-2 text-slate-600">
              <FaMapMarkerAlt className="text-green-700 text-lg font-semibold" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-slate-900 w-full font-semibold max-w-[200px] text-white text-center p-2 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full font-semibold max-w-[200px] text-white text-center p-2 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} Price cut
                </p>
              )}
            </div>
            <div className="">
              <ul className="flex flex-wrap gap-5 my-2 text-green-800 font-semibold text-sm md:text-lg">
                <li className="flex gap-2 items-center whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Beds`
                    : `${listing.bedrooms} Bed`}
                </li>
                <li className="flex gap-2 items-center whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Baths`
                    : `${listing.bathrooms} Bath`}
                </li>
                <li className="flex gap-2 items-center whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? (
                    `Parking space`
                  ) : (
                    <span className="text-red-700">No Parking</span>
                  )}
                </li>
                <li className="flex gap-2 items-center whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? (
                    `Furnished`
                  ) : (
                    <span className="text-red-700">Unfurnished</span>
                  )}
                </li>
              </ul>
              <div className="text-slate-800">
                <span className="font-bold text-black">About Home</span>
                <ShowMoreText
                  lines={4}
                  more="See more"
                  less="See less"
                  anchorClass="text-blue-500 cursor-pointer"
                >
                  {listing.description}
                </ShowMoreText>
              </div>
              <div className="flex justify-center mt-5">
                {currentUser ? (
                  listing.userRef === currentUser._id ? (
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="p-3 w-[50%] text-center bg-slate-700 rounded-lg text-white uppercase hover:opacity-80"
                    >
                      Update Listing
                    </Link>
                  ) : (
                    !contact && (
                      <div className="w-[50%]">
                        <button
                          onClick={() => setContact(true)}
                          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 w-full" // Add w-full class here
                        >
                          Contact Owner
                        </button>
                      </div>
                    )
                  )
                ) : (
                  !contact && (
                    <div className="w-[50%]">
                      <button
                        onClick={() => setContact(true)}
                        className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3 w-full" // Add w-full class here
                      >
                        Contact Owner
                      </button>
                    </div>
                  )
                )}
                {/* sending listing info as a props to Contact.jsx */}
                {contact && <Contact listing={listing} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
