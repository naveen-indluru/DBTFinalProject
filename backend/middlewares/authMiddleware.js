import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import Staff from "../models/staffModel.js";

const protect = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.role === "user") {
        const user = await User.findById(decoded.userID).select("-password");
        req.user = user;
      } else {
        req.user = await Staff.findById(decoded.userID).select("-password");
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
