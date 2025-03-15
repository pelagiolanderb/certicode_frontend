import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/OtherPage/NotFound";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" />;
  }
  
  if (token && role === 'admin') return <Component {...rest} />;

  return <NotFound />;
};

export default ProtectedRoute;
