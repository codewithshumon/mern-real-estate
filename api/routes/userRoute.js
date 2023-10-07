import express from "express";

//enternal exports
import { test } from "../controllers/userController.js"; //if only use export then use .js

const router = express.Router();

router.get("/test", test);

export default router;
