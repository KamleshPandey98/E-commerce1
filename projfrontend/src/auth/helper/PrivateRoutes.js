import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";
// import { isAuthenticated } from '../../../../projbackend/controllers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
