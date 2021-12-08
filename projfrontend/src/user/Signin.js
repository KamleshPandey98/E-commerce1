import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { cPrint } from "../backend";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const onHandleInputChange = (fieldName) => (event) => {
    event.preventDefault();
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    await signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          cPrint("inn");
          setValues({
            ...values,
            error: data.error,
            loading: false,
          });
        } else {
          authenticate(data, () => {
            setValues({ ...values, error: "", didRedirect: true });
          });
        }
      })
      .catch(console.log("Sign in request failed."));
  };

  // const handleToast = () => {
  //   toast.dismiss();
  //   if (error) {
  //     toast.error(error);
  //     return <ToastContainer />;
  //   } else {
  //     toast.error("error");
  //     return <ToastContainer />;
  //   }
  // };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading.....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    if (error) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
          </div>
        </div>
      );
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  // design
  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form className="my-2">
            <div className="form-group mb-2">
              <label className="text-light">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={onHandleInputChange("email")}
              />
            </div>

            <div className="form-group mb-2">
              <label className="text-light">Password</label>
              <input
                type="text"
                className="form-control"
                value={password}
                onChange={onHandleInputChange("password")}
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
    <Base title="Signin Page" description="A Page for user to sign in !">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
