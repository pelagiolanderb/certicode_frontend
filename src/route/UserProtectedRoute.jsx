import React from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/OtherPage/NotFound";
import { useAuth } from "../context/AuthContext";


const UserProtectedRoute = ({ component: Component, ...rest }) => {
  // const token = localStorage.getItem("auth_token");
  // const role = localStorage.getItem("role");

  const { token, role } = useAuth();

    if (!token) return <Navigate to="/signin" />;

    if (token && role === 'user') return <Component {...rest} />
    if (token && role === 'admin') return <Component {...rest} />

    return <NotFound />;
};

export default UserProtectedRoute;
