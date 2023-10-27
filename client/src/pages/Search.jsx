import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-7">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search by Text
            </label>
            <input
              className="border rounded-lg w-full p-2 outline-none"
              type="text"
              id="searchTerm"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Type</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="all" />
              <span>Sale & Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold whitespace-nowrap">Amenities</label>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="parking" />
              <span>Parking Space</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label>Sort</label>
            <select className="border rounded-lg p-2 w-full" id="sort_order">
              <option value="">Latest</option>
              <option value="">Oldest</option>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-3xl border-b p-3 text-slate-700">
          Listing results
        </h1>
      </div>
    </div>
  );
}
