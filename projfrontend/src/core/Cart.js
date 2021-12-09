import React, { useEffect, useState } from "react";
import Base from "./Base";
import CustomCard from "./CustomCard";
import { loadCart } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [redirect, setRedirect] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to laod all componenets</h2>
        {products.length > 0 ? (
          products &&
          products.map((product, index) => (
            <div className="my-2">
              <CustomCard
                key={product._id}
                product={product}
                removeFromCart={true}
                addToCart={false}
                reload={reload}
                setReload={setReload}
              />
            </div>
          ))
        ) : (
          <h3>Cart is Empty</h3>
        )}
      </div>
    );
  };

  const loadCheckouts = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready To Checkout">
      <div className="row text-center ">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckouts()}</div>
      </div>
    </Base>
  );
};

export default Cart;
