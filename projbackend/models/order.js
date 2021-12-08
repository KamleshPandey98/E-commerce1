import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const ProductCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

// module.exports = { Order, ProductCart };  //old way

// for multiple export default will not be used
export default { Order, ProductCart };
// export default Order;
// export default ProductCart;
