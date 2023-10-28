import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../assets/components/ListingItem";

export default function Search() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState([]);
  const [sideberdata, setSideberdata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [showMore, setShowMore] = useState(false);

  console.log("listing", listing);

  const handleChange = (e) => {
    //seting sideberdata if input id is all/rent/sale
    if (e.target.id === "searchTerm") {
      setSideberdata({ ...sideberdata, searchTerm: e.target.value });
    }

    //seting sideberdata if input id is all/rent/sale
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideberdata({ ...sideberdata, type: e.target.id });
    }

    //seting sideberdata if input id is parking/furnished/offer
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideberdata({
        ...sideberdata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
        //e.target.checked value could be true as variabel or true as string
      });
    }

    //seting sideberdata if input id is sort_order and changing the valu created_at/desc
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSideberdata({ ...sideberdata, sort: sort, order: order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //"URLSearchParams" built in js class constrctor. Using it to get url parms so that we get keep the previous search params with quary params
    //"window.location.search" returns full URL's with query string
    //we can use "window.location.search" like URLSearchParams(window.location.search) or only "location.search "
    //URLSearchParams() if we lef it enpty. it'll take full parmas with query string
    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sideberdata.searchTerm);
    urlParams.set("type", sideberdata.type);
    urlParams.set("parking", sideberdata.parking);
    urlParams.set("furnished", sideberdata.furnished);
    urlParams.set("offer", sideberdata.offer);
    urlParams.set("sort", sideberdata.sort);
    urlParams.set("order", sideberdata.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    //"URLSearchParams" built in js class constrctor. Using it to get url parms so that we get keep the previous search params with quary params
    //"window.location.search" returns full URL's with query string
    //we can use "window.location.search" or only "location.search"
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      // here if any of these changes then setting setSideberdata
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      offerFromUrl
    ) {
      setSideberdata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setShowMore(false);
      setError(false);
      setLoading(true);

      const searchQuery = urlParams.toString();
      //geting search result from database of listing
      const res = await fetch(`/api/listing/search?${searchQuery}`);
      //then converting to json the res that we get from database of listing
      const data = await res.json();

      if (!data) {
        setLoading(false);
        setError(true);
        return;
      }

      if (data.length > 8) {
        setShowMore(true);
      }
      //setting the coverted data to listing state
      setListing(data);
      setLoading(false);
    };

    fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onShowMoreclick = async () => {
    setError(false);
    setLoading(true);
    //getting previous listing data length, so we can skip those number for next search
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    //geting search result from database of listing
    const res = await fetch(`/api/listing/search?${searchQuery}`);
    //then converting to json the res that we get from database of listing
    const data = await res.json();

    if (!data) {
      setError(true);
      return;
    }

    //new searching listing data if less than 9
    if (data.length < 9) {
      setShowMore(false);
    }
    //setting the coverted data to listing state
    //here we are keeping previous arrray listing data and adding new array data
    setListing([...listing, ...data]);
    setLoading(false);
    setError(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-1">
      <div className="p-7  w-full md:min-w-[300px] md:max-w-[350px] border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search by Text
            </label>
            <input
              className="border rounded-lg w-full p-2 outline-none"
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sideberdata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Type</label>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="all"
                onChange={handleChange}
                checked={sideberdata.type === "all"}
              />
              <span>Sale & Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={sideberdata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={sideberdata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={sideberdata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Amenities</label>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={sideberdata.parking}
              />
              <span>Parking Space</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-5"
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={sideberdata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label>Sort</label>
            <select
              className="border rounded-lg p-2 w-full"
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      {/* //overflow-x-hidden */}
      <div className=" flex-1 ">
        <h1 className="font-bold text-3xl border-b p-3 text-slate-700">
          Listing Results
        </h1>
        <div className="flex justify-center">
          {loading && listing.length < 10 && (
            <p className="text-2xl font-semibold text-slate-800 text-center mt-10">
              Loading...
            </p>
          )}
          {!loading && listing.length === 0 && (
            <p className="text-2xl font-bold text-slate-800 text-center mt-10">
              No listing found!
            </p>
          )}
          {error && listing.length < 10 && (
            <p className="text-2xl font-semibold text-red-800 text-center w-full mt-10">
              Error showing lising
            </p>
          )}
        </div>
        <div className="p-7 flex flex-wrap gap-4">
          {listing &&
            listing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
              //here wer are senting listing array to ListingItem.jsx as props
            ))}
          {showMore && (
            <button
              onClick={onShowMoreclick}
              className="text-green-700 hover:underline p-3 w-full text-center"
            >
              Show More
            </button>
          )}
          {listing.length > 9 && loading && (
            <p className="text-2xl font-semibold text-slate-800 text-center w-full mt-10">
              Loading...
            </p>
          )}
          {listing.length > 9 && error && (
            <p className="text-2xl font-semibold text-red-800 text-center w-full mt-10">
              Error showing lising
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
