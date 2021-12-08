import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import { ToastContainer, toast } from "react-toastify";
import { handleToast } from "../reusables/HandleToast";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, authToken } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-2">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    if (!name) {
      return handleToast(false, "Field is required", toast.TYPE.ERROR);
    }

    // backend request fired
    createCategory(user._id, authToken, { name }).then((data) => {
      console.log(data);
      if (data.error) {
        setError(true);
        handleToast(false, data.error, toast.TYPE.ERROR);
      } else {
        setError("");
        setSuccess(true);
        setName("");
        handleToast(true, "Successfully Created", toast.TYPE.SUCCESS);
      }
    });
  };

  const myCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-2"
            onChange={handleChange}
            value={name}
            autoFocus
            required={true}
            placeholder="For ex. Kamlesh"
          />
          <button className="btn btn-outline-success my-2" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-success p-4"
    >
      <ToastContainer autoClose={3000} limit={3} />
      <div className="row bg-white rounded">
        {goBack()}
        <div className="col-md-8 offset-md-2">{myCategoryForm()}</div>
      </div>
    </Base>
  );
};

export default AddCategory;
