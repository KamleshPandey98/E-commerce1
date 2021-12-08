import User from "../models/user.js";
import express from "express";

// import router from "./auth";
var router = express.Router();
import { authenticateJWT, isAuthenticated } from "../controllers/auth.js";
import {
  getAllUsers,
  getUser,
  getUserById,
  updateUser,
  userPurchaseList,
} from "../controllers/user.js";

//routes
router.param("userId", getUserById);

router.get("/user/:userId", authenticateJWT, isAuthenticated, getUser);
router.put("/user/:userId", authenticateJWT, isAuthenticated, updateUser);
router.get(
  "/orders/user/:userId",
  authenticateJWT,
  isAuthenticated,
  userPurchaseList
);

router.get("/users", getAllUsers);

export default router;
