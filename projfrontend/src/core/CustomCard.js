import React, { useState } from "react";
import { Redirect } from "react-router";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const CustomCard = ({
  product,
  addToCart = true,
  removeFromCart = false,
  reload,
  setReload = (f) => f,
}) => {
  const [redirect, setRedirect] = useState(false);

  const productTitle = product ? product.name : "A photo license free";
  const productDescription = product
    ? product.description
    : "A photo license free";
  const productPrice = product ? product.price : "A photo license free";

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const addProdToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={() => addProdToCart()}
          className="btn btn-block btn-outline-success my-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info">
      {getRedirect(redirect)}
      <div className="card-header lead">{productTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {productDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">$ {productPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
