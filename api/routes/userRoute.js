import express from "express";

//enternal exports
import {
  deleteUser,
  getUserListings,
  test,
  updateUser,
} from "../controllers/userController.js"; //if only use export then use .js
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);

export default router;
