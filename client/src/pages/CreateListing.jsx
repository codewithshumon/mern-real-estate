import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6">
        {/* left side form */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            minLength="10"
            required
          />
          <div className="font-semibold flex flex-wrap gap-6">
            <div className="flex gap-2">
              {/* when will add clsNm gap-2 then w-5 will work  */}
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              {/* when will add clsNm gap-2 then w-5 will work  */}
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Sport</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 justify-start">
            <div className="flex items-center gap-3 font-semibold">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-3 font-semibold">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Months)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="border border-gray-300 rounded-lg p-3"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs">($ / Months)</span>
              </div>{" "}
            </div>
          </div>
        </div>

        {/* right side form */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            Image:{" "}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (Max-6)
            </span>
          </p>
          <div className="flex flex-col gap-6 mt-5">
            <input
              className="p-3 border-2 border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 font-semibold border hover:border-2 text-green-700  border-green-700 uppercase rounded-lg hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-4 mt-6 font-semibold text-xl bg-slate-700 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
