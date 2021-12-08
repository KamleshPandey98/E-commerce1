// import { Order, ProductCart } from "../models/order.js";

import Order from "../models/order.js";
import ProductCard from "../models/order.js";

export function getOrderById(req, res, next, id) {
  Order.findById(id).exec((err, order) => {
    if (err) {
      res.status(400).json({
        error: "No order found in DB",
      });
    }
    req.order = order;
    next();
  });
}

export function createOrder(req, res) {
  req.body.order.user = req.profile;
  var order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
}
