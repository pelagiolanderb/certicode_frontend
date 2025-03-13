import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
