import { windowObjectPresent } from "../../reusables/CommonMethods";

export const addItemToCart = (item, next) => {
  let cart = [];
  if (windowObjectPresent()) {
    let localCartItems = localStorage.getItem("cart");
    if (localCartItems) {
      cart = JSON.parse(localCartItems);
    }
    cart.unshift({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (windowObjectPresent()) {
    let localCartItems = localStorage.getItem("cart");
    if (localCartItems) {
      return JSON.parse(localCartItems);
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  if (windowObjectPresent) {
    let localCartItems = localStorage.getItem("cart");
    if (localCartItems) {
      cart = JSON.parse(localCartItems);
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const cartEmpty = (next) => {
  if (windowObjectPresent) {
    localStorage.removeItem("cart");
    next();
  }
};
