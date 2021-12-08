import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getAllCategory,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";
import ProductForm from "./components/ProductForm";
import BackToDashboard from "./components/BackToDashboard";
import { handleToast } from "../reusables/HandleToast";

// props.match.params.anyNameOfendPointUrl // as written in routes
// match is by DEFAULT cannot be renamed
const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  const preloadCategories = () => {
    getAllCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  //TODO: work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          handleToast(false, data.error, "error");
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
          handleToast(false, "updated successfully", "success");
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} created successfully</h4>
    </div>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      {/* <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link> */}
      {BackToDashboard()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {ProductForm({
            values: values,
            categories: categories,
            handleChange: handleChange,
            onSubmit: onSubmit,
          })}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
