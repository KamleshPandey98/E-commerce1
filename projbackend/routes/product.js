import express from "express";
var router = express.Router();

import {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} from "../controllers/product.js";
import { getUserById } from "../controllers/user.js";
import {
  isAdmin,
  isAuthenticated,
  authenticateJWT,
} from "../controllers/auth.js";

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

// actual routes
router.post(
  "/product/create/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read Routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Delete Route
router.delete(
  "/product/:productId/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// Update Route
router.put(
  "/product/:productId/:userId",
  authenticateJWT,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Listing Route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

export default router;
