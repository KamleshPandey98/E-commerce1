import React, { useState, useEffect } from "react";

import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";
import { handleToast } from "../reusables/HandleToast";
import { ToastContainer } from "react-toastify";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, authToken } = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        handleToast(false, data.error, "error");
        // console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, authToken).then((data) => {
      if (data.error) {
        handleToast(false, data.error, "error");
      } else {
        preload();
        handleToast(true, data.message, "success");
      }
    });
  };

  const scrollStyle = {
    overflow: "scroll",
    height: "80vh",
    whiteSpace: "nowrap",
  };

  return (
    <Base title="Manage Products" description="Manage products here">
      <ToastContainer autoClose={3000} limit={3} />

      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <h2 className="text-center text-white my-3">{products.length}</h2>
        <div className="col-12" style={scrollStyle}>
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
