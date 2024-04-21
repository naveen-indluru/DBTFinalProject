import asyncHandler from "../middlewares/asyncHandler.js";

import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  }

  const order = new Order({
    orderItems: orderItems.map((x) => ({
      ...x,
      book: x._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user deliveredBy"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { id, status, update_time, email_address } = req.body;

  const payment = new Payment({ id, status, update_time, email_address });
  const createdPayment = await payment.save();

  if (order) {
    order.isPaid = true;
    order.paymentID = createdPayment._id;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.status(200).json(orders);
});

const getReadyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    orderStatus: { $in: ["Ready", "Out for Delivery"] },
  }).populate("user");
  res.status(200).json(orders);
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.orderStatus === "Yet to Process") {
      order.orderStatus = "Ready";
    } else if (order.orderStatus === "Ready") {
      order.orderStatus = "Out for Delivery";
    } else {
      order.orderStatus = "Delivered";
      order.deliveredAt = Date.now();
      order.deliveredBy = req.body.userId;
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const deliveredByMe = asyncHandler(async (req, res) => {
  const orders = await Order.find({ deliveredBy: req.params.id }).populate(
    "user deliveredBy"
  );
  res.status(200).json(orders);
});

export {
  addOrderItems,
  deliveredByMe,
  getMyOrders,
  getOrderById,
  getReadyOrders,
  updateOrderToPaid,
  updateOrderStatus,
  getAllOrders,
};
