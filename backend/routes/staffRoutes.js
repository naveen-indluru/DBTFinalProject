import express from "express";
const router = express.Router();

import {
  loginStaff,
  logoutStaff,
  registerStaff,
  updateStaff,
  updateStaffProfile,
  deleteStaff,
  getStaff,
  getStaffById,
} from "../controllers/staffController.js";

router.route("/").get(getStaff).post(registerStaff);
router.route("/:id").get(getStaffById).put(updateStaff).delete(deleteStaff);
router.post("/logout", logoutStaff);
router.post("/login", loginStaff);
router.route("/:id/profile").put(updateStaffProfile);

export default router;
