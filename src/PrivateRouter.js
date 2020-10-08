import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const decodedToken = useSelector((state) => state.userStatus.decodedToken);
  console.log(decodedToken);
  return (
    <Route
      {...rest}
      path={path}
      render={(props) =>
        decodedToken ? <Component {...props} /> : <Redirect to={"/register"} />
      }
    />
  );
};
export default PrivateRoute;
