import express from "express";
var router = express.Router();

import {
  authenticateJWT,
  isAuthenticated,
  isAdmin,
} from "../controllers/auth.js";
import {
  getUser,
  getUserById,
  pushOrderInPurchaseList,
} from "../controllers/user.js";
import { updateStock } from "../controllers/product.js";
import { getOrderById, createOrder } from "../controllers/order.js";

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual Routes

// Create routes
router.post(
  "order/create/:userId",
  authenticateJWT,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// Read routes

export default router;
