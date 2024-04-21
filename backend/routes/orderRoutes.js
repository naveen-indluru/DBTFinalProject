import express from "express";
const router = express.Router();
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getMyOrders,
  getOrderById,
  addOrderItems,
  updateOrderToPaid,
  getAllOrders,
  updateOrderStatus,
  getReadyOrders,
  deliveredByMe,
} from "../controllers/ordersController.js";
router.route("/").post(protect, addOrderItems).get(getAllOrders);
router.route("/ready").get(getReadyOrders);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(updateOrderToPaid);
router.route("/:id/update").put(updateOrderStatus);
router.route("/mine/:id").get(getMyOrders);
router.route("/delivered/:id").get(deliveredByMe);
export default router;
