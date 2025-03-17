import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/OtherPage/NotFound";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");
  
  if (!token) {
    return <Component {...rest} />;
  }
  
  if (token && role === 'admin') return <Component {...rest} />;
  if (token && role === 'user') return <Component {...rest} />;

  return <NotFound />;
};

export default ProtectedRoute;
