import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      //importing google auth provider from firebase
      const provider = new GoogleAuthProvider();
      //importing firebase all configaration form firebase.js
      const auth = getAuth(app);

      //createing google popup signin/up function
      const result = await signInWithPopup(auth, provider);

      //send google user info to backend/api routes to create to user
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const googleData = await res.json();
      dispatch(signInSuccess(googleData));
      navigate("/");
    } catch (error) {
      console.log("Sing in error", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      //if we use type button instaed of submit/blank it will prevent form submit
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80 "
    >
      Continue with google
    </button>
  );
}
