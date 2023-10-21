import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrl: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uplading, setUploading] = useState(false);

  console.log("formData", formData);

  const handleImageSubmit = () => {
    //as handleImageSubmit type=button, no need to e.preventDefault().
    //Cause by declearing type to button it not a sumbit button/function for form

    if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrl: formData.imageUrl.concat(urls),
          });

          //if there is a error by previous stpe then error will be remove
          setUploading(false);
          setImageUploadError(false);
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError("Image upload failed (Max 2MB per Image)");
        });
    } else {
      setUploading(false);
      setImageUploadError("Max upload limit 6 images");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storeage = getStorage(app);
      const fileName = file.name + new Date().getTime();
      const storageRef = ref(storeage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrl: formData.imageUrl.filter((url, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
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
          <div className="flex flex-col gap-3 mt-5">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="p-3 border-2 border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <p className="text-red-700 text-sm mt-2">{imageUploadError}</p>
            {formData.imageUrl.map((urls, index) => (
              <>
                {/* when we use map then we need to add key. like here key={urls} */}
                <div
                  key={urls}
                  className="flex justify-between p-3 border items-center rounded-lg"
                >
                  <img
                    src={urls}
                    alt="Listing Image"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                  <button
                    //if we don't use callback function handleRemoveImage(index)
                    //will call atometically. Cause of adding "(index)"
                    onClick={() => handleRemoveImage(index)}
                    type="button"
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-80"
                  >
                    Delete
                  </button>
                </div>
              </>
            ))}
            <button
              disabled={uplading}
              //byDefault inside form all button is submit button
              //so if we selet type='button' it will work as button not submit
              type="button"
              onClick={handleImageSubmit}
              className="p-3 font-semibold border-2 text-green-700 border-green-900 uppercase rounded-lg hover:shadow-lg hover:border-green-700 hover:text-green-950 disabled:opacity-80"
            >
              {uplading ? "Uploading..." : "Upload"}
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
