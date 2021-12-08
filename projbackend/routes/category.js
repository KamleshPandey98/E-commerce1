import User from "../models/user.js";
import express from "express";
var router = express.Router();

import {
  getAllCategory,
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.js";
import { getUserById } from "../controllers/user.js";
import {
  authenticateJWT,
  isAuthenticated,
  isAdmin,
} from "../controllers/auth.js";

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// actual routes routes here

// CREATE
router.post(
  "/category/create/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  createCategory
);

// READ
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// UPDATE
router.put(
  "/category/:categoryId/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// DELETE
router.delete(
  "/category/:categoryId/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

export default router;
