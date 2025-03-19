import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import NotFound from "../pages/OtherPage/NotFound";

const ProtectedRoute = ({
  component: Component,
  publicRoute = false,
  onlyAdmin = false,
  onlyNonAdmin = false,
  ...rest
}) => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");
  const location = useLocation();
  const current_path = location.pathname;
  const isVerifying = localStorage.getItem('isVerifying');

  if (
    token &&
    (current_path === "/signin" || current_path === "/signup")
  ) {
    return <NotFound />;
  }

  if (isVerifying && onlyNonAdmin) {
    return <Component {...rest} />;
  }

  if (!token && publicRoute) {
    return <Component {...rest} />;
  } 

  if (token && onlyAdmin && role === 'admin') {
    return <Component {...rest} />;
  }

  if (token && onlyNonAdmin && role === 'user') {
    return <Component {...rest} />;
  }

  return <NotFound />;
};

export default ProtectedRoute;
