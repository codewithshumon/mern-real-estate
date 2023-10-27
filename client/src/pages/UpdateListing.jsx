/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "",
    offer: false,
    userRef: null,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uplading, setUploading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      //here we use params.listingId. cause we've set 'update-listing/:listingId in app.jsx
      const listingId = params.listingId;

      const res = await fetch(`/api/listing/get/${listingId}`, {
        method: "GET",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = () => {
    //as handleImageSubmit type=button, no need to e.preventDefault().
    //Cause by declearing type to button it not a sumbit button/function for form

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
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
            imageUrls: formData.imageUrls.concat(urls),
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
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    //here e.target.id means if id=sale/rent in the <input />
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    //here e.target.id means if id=parking/furnished/offer in the <input />
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    //here e.target.id means if type=number/text/textarea in the <input />
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("Upload minimum one image");

      //by adding '+' before formData.regularPrice & formData.discountPrice it will prevent
      //if there comes any string number from the verable. By "+" it only allows 'Number'
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be less then Regular price");
      //starting loading by true and closing previous error by falses
      setLoading(true);
      setError(false);

      //here we use params.listingId. cause we've set 'update-listing/:listingId in app.jsx
      //and getting prams form 'useParms' react-router-dom
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update your Listing details
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        {/* left side form */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Title"
            className="border p-3 rounded-lg"
            id="title"
            maxLength="70"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            minLength="20"
            maxLength="500"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            minLength="10"
            maxLength="50"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="font-semibold flex flex-wrap gap-6">
            <div className="flex gap-2">
              {/* when will add clsNm gap-2 then w-5 will work  */}
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              {/* when will add clsNm gap-2 then w-5 will work  */}
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Sport</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-3 font-semibold">
              <input
                type="number"
                id="regularPrice"
                min="0"
                required
                className="border border-gray-300 rounded-lg p-3"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / Months)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-3 font-semibold">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  required
                  className="border border-gray-300 rounded-lg p-3"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-xs">($ / Months)</span>
                </div>
              </div>
            )}
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
            {formData.imageUrls.map((urls, index) => (
              <div key={index}>
                <div className="flex justify-between p-3 border items-center rounded-lg">
                  <img
                    src={urls}
                    alt="Listing Image"
                    className="w-24 h-24 object-contain rounded-lg"
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
              </div>
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
          {error && <p className="text-red-700 text-sm mt-3">{error}</p>}
          <button
            disabled={loading || uplading} //also disabled when uplading images
            className="p-4 mt-6 font-semibold text-xl bg-slate-700 rounded-lg uppercase text-white hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
