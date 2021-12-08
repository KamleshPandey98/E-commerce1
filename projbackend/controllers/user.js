import User from "../models/user.js";
import Order from "../models/order.js";

export function getUserById(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: "failed",
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
}

export function getUser(req, res) {
  //TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
}

export function getAllUsers(req, res) {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        status: "failed",
      });
    }
    res.allUsers = users;
    res.allUsers.forEach((element) => {
      element.salt = undefined;
      element.encry_password = undefined;
      element.createdAt = undefined;
      element.updatedAt = undefined;
      element.__v = undefined;
    });
    res.send(res.allUsers);
  });
}

export function updateUser(req, res) {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      console.log(user);
      if (err || !user) {
        return res.status(400).json({
          error: "You are not authorized to update this user.",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
}

export function userPurchaseList(req, res) {
  Order.find({
    user: req.profile._id,
  })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account",
        });
      }
      return res.json(order);
    });
}

export function pushOrderInPurchaseList(req, res, next) {
  let purchases = [];
  //coming from front end so req.body is used
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // store this in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
}
