import express from "express";
var router = express.Router();
import {
  signOut,
  signUp,
  signIn,
  authenticateJWT,
} from "../controllers/auth.js";
import User from "../models/user.js";
import { check } from "express-validator";

router.post(
  "/signup",
  check("name")
    .isLength({ min: 3 })
    .withMessage("name should be at least 3 char"),
  check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser != null) {
        console.log(existingUser);
        throw Error("Email already in use");
      }
    }),
  check("password")
    .isLength({ min: 3 })
    .withMessage("password should be at least 3 char"),
  signUp
);

router.post(
  "/signin",
  check("email")
    .trim()
    .exists()
    .notEmpty()
    .withMessage("Email field is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("password field is required")
    .isLength({ min: 3 })
    .withMessage("password length should be atleast 3"),
  signIn
);

router.get("/signout", signOut);

router.get("/testroute", authenticateJWT, (req, res) => {
  res.json({
    auth: req.auth,
  });
});

export default router;
// module.exports = router;
