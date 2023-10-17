import express from "express";

//enternal exports
import { test, updateUser } from "../controllers/userController.js"; //if only use export then use .js
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
