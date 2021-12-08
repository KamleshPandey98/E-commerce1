import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createaProduct, getAllCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { handleToast } from "../reusables/HandleToast";
import { ToastContainer } from "react-toastify";
import ProductForm from "./components/ProductForm";

const AddProduct = () => {
  const { user, authToken } = isAuthenticated();

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
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = async () => {
    await getAllCategory().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        handleToast(false, data.error, "error");
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        // handleToast(false, `${createdProduct} created successfully`, "success");
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    console.log("inn");
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaProduct(user._id, authToken, formData).then((data) => {
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
        handleToast(true, `${data.name} created successfully`, "success");
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <ToastContainer autoClose={3000} limit={3} />
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
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

export default AddProduct;
