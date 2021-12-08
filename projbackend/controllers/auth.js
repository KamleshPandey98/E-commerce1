import { validationResult } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const signUp = (req, res) => {
  const errors = validationResult(req).array();
  console.log(errors);
  // console.log(req.body);
  if (!!errors.length) {
    return res.status(422).json({
      status: "failed",
      error: true,
      msg: errors[0].msg,
      param: errors[0].param,
      location: errors[0].location,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        status: "failed",
        error: "NOT able to save user in DB",
        message: err,
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      last_name: user.lastname,
      email: user.email,
    });
  });
};

export function signIn(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req).array();
  if (!!errors.length) {
    return res.status(422).json({
      status: "failed",
      error: errors[0].msg,
      msg: errors[0].msg,
      param: errors[0].param,
      location: errors[0].location,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: "failed",
        error: "User email does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: "failed",
        error: "Email and Password did not match",
      });
    }

    //create token
    const authToken = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("authToken", authToken, { expire: new Date() + 9999 });
    // send response to front end
    const { _id, name, email, role } = user;
    return res.json({ authToken, user: { _id, name, email, role } });
  });
}

export const signOut = (req, res) => {
  // res.send("user signout successfully");
  res.clearCookie("authToken");
  res.json({
    staus: "success",
    message: "User Signed Out.",
  });
};

//protected route
// means isSignedIn
export function authenticateJWT(req, res, next) {
  // expressJwt({
  //   secret: process.env.SECRET,
  //   userProperty: "auth",
  //   algorithms: ["HS256"],
  // });
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    // here auth is manual created property (this also req.auth)
    jwt.verify(token, process.env.SECRET, (err, auth) => {
      if (err) {
        return res.status(403).json({
          staus: "failed",
          error: "Unauthorized",
        });
      }
      // setting auth in req.auth property
      req.auth = auth;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

//custom middlewares
export function isAuthenticated(req, res, next) {
  const checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      status: "failed",
      error: "ACCESS DENIED",
    });
  }
  next();
}

export function isAdmin(req, res, next) {
  if (req.profile.role === 0) {
    return res.status(403).json({
      status: "failed",
      error: "Not Admin , Access Denied",
    });
  }
  next();
}
