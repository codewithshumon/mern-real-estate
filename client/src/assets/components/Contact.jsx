import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [owner, setOwner] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        setError(false);
        //if it's a get methon then do not need to sent methot=get
        const res = await fetch(`/api/user/${listing.userRef}`);

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        }
        setOwner(data);
        setError(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchOwner();
  }, [listing.userRef]); //when listing.userRef will change this useEffect will run

  const textValueChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {owner ? (
        <div className="flex flex-col gap-2">
          <p className="">
            Send your interest to{" "}
            <span className="font-semibold">{owner.username}</span> for{" "}
            <span>{listing.title.toLowerCase()}</span>
          </p>
          <textarea
            className="w-full p-3 outline-none border rounded-lg my-2"
            name="message"
            id="message"
            rows={4}
            value={message}
            placeholder="Write your message here..."
            onChange={textValueChange}
          ></textarea>
          <a //here we can use "Link" insted of <a> tag
            href={`mailto:${owner.email}?subject=Regarding ${listing.title}&body=${message}`}
            // Add "_blank" or "blank" to open the link in a new tab. if
            target="_blank"
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-80"
            rel="noreferrer"
          >
            Send Message
          </a>
        </div>
      ) : (
        <div>
          <p>
            To contact with the home owner please
            <Link
              className="text-blue-700 cursor-pointer font-semibold"
              to={"/sign-up"}
            >
              {" "}
              Create a Account
            </Link>
            <span> or</span>
            <Link
              className="text-blue-700 cursor-pointer font-semibold"
              to={"/sign-in"}
            >
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

Contact.propTypes = {
  listing: PropTypes.any.isRequired,
};
