import express from "express";
import { authenticateJWT, isAuthenticated } from "../controllers/auth.js";
import { getToken, processPayment } from "../controllers/paymentB.js";

// PAYPAL
var router = express.Router();

router.get(
  "/payment/gettoken/:userId",
  authenticateJWT,
  isAuthenticated,
  getToken
);

router.post(
  "/payment/braintree/:userId",
  authenticateJWT,
  isAuthenticated,
  processPayment
);

export default router;
