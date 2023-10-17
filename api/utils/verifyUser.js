import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  //getting token info from cookies. Here access_token is cookie name
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRECT, (err, user) => {
    //checking if use has valid token
    if (err) return next(errorHandler(401, "Forbidden"));

    //sending user info inside the cookie name:access_token to the router/backend
    req.user = user;

    //calling next() to let execute the next middleware in useRouter.js updateUser
    next();
  });
};
