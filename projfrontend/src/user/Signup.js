import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChange = (fieldName) => (event) => {
    event.preventDefault(event.target.value);
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleToast = (boolsuccess, errMsg) => {
    toast.dismiss();
    if (boolsuccess) {
      toast.success(onSuccessLoginNavigate);
    } else if (errMsg) {
      toast.error(errMsg);
    } else {
      toast.error("error");
    }
  };

  const onSuccessLoginNavigate = () => {
    return (
      <div>
        User successfully saved. <Link to="/signin">Login Here</Link>
      </div>
    );
  };

  const onSubmit = async () => {
    // setValues({ ...values, error: false });
    await signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.msg,
            success: false,
          });
          handleToast(false, data.msg);
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
          handleToast(true, "User successfully saved.");
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form className="my-2">
            <div className="form-group mb-2">
              <label className="text-light">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("name")}
                value={name}
                name="name"
              />
            </div>

            <div className="form-group mb-2">
              <label className="text-light">Email</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                name="email"
              />
            </div>

            <div className="form-group mb-2">
              <label className="text-light">Password</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("password")}
                value={password}
                name="password"
              />
            </div>

            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A Page for user to sign up !">
      {/* <h1>Signup Works</h1> */}
      <ToastContainer autoClose={3000} limit={3} />
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
