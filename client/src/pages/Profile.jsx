/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePers, setFilePers] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [showListingMessageMessageError, setShowListingMessageError] =
    useState(false);
  const [userListings, setUserListings] = useState([]);
  const [listingLoading, setListingLoading] = useState(false);
  const [listingDeleteError, setListingDeleteError] = useState(false);

  const dispatch = useDispatch();

  //after define fileRef go to console.firebase Build>storage and set rules blow
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePers(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ avatar: downloadURL, ...formData });
        });
      }
    );
  };

  //setting input value change functionality
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }

      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setFileUploadError(false);
      setListingLoading(true);

      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        method: "GET",
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        setListingLoading(false);
        return;
      }

      if (data.length === 0) {
        setListingLoading(false);
        return setShowListingMessageError(true);
      }

      setUserListings(data);
      setListingLoading(false);
      setShowListingMessageError(false);
    } catch (error) {
      setFileUploadError(true);
      setListingLoading(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    setListingDeleteError(false);
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      //VERY IMPORTANT
      //If here we don't use await redux store will lose the
      //currentUser value/info when click the button and run the fnc handleSubmit()
      const data = await res.json();

      if (data.success === false) {
        setListingDeleteError(true);
        return;
      }

      setUserListings((prevData) =>
        prevData.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setListingDeleteError(true);
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Only accept image within 2 MB</span>
          ) : filePers > 0 && filePers < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePers}%`}</span>
          ) : filePers === 100 ? (
            <span className="text-green-700 font-semibold">
              Upload Successful
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-slate-700 text-white uppercase font-semibold p-3 rounded-lg hover:opacity-80 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white uppercase font-semibold p-3 rounded-lg hover:opacity-80 text-center"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <p className="text-red-700 mt-5 font-semibold">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 font-semibold">
        {updateSuccess ? "User is updated" : ""}
      </p>
      <div className="flex justify-between mt-5 hover:opacity-90">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer font-semibold"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer font-semibold"
        >
          Sign Out
        </span>
      </div>
      <button
        disabled={loading}
        onClick={handleShowListings}
        className="bg-slate-700 text-white w-full uppercase font-semibold p-3 rounded-lg hover:opacity-80 text-center mt-4"
      >
        {listingLoading ? "Loading..." : "Show Listings"}
      </button>
      <p className="text-red-700 mt-4 text-sm">
        {showListingError ? "Error show listings" : ""}
      </p>
      <p className="text-red-700 mt-4 text-sm">
        {listingDeleteError ? `Error deleting listings` : ""}
      </p>
      <p className="text-red-700 mt-4 text-sm">
        {showListingMessageMessageError ? (
          <p>
            You don't have any listing yet!{" "}
            <Link
              className="font-semibold text-green-700 hover:underline"
              to={"/create-listing"}
            >
              Create a new listing
            </Link>
          </p>
        ) : (
          ""
        )}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="my-4 text-center font-semibold text-2xl">
            Your Listing Properties
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border-2 rounded-lg p-3 gap-4 flex justify-between items-center"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="w-24 h-24 rounded-lg object-contain"
                  src={listing.imageUrls[0]}
                  alt="listing-cover"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.title}</p>
              </Link>
              <div className="flex gap-5">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700 font-semibold uppercase"
                >
                  Delete
                </button>
                <button className="text-green-700 font-semibold uppercase">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
