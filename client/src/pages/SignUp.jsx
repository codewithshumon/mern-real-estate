/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sing Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="passward"
          className="border p-3 rounded-lg"
          id="passward"
        />
        <button className="bg-slate-700 text-white uppercase font-semibold p-3 rounded-lg hover:opacity-80 disabled:opacity-70">
          Sing Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sing-in"}>
          <span className="text-blue-700">Sing In</span>
        </Link>
      </div>
    </div>
  );
}
