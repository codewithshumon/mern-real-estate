import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  //here using Outlet cmpn. it will show the page inside the PrivateRouter cmpn
  return currentUser ? <Outlet /> : <Navigate to="sign-in" />;
}
