import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser);

router.post("/logout", logoutUser);
router.post("/login", authUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
