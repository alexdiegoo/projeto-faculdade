import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isTokenValid = () => {
  const token = Cookies.get("token");

  return !!token;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isTokenValid() ? <Component /> : <Navigate to="login" />;
};

export default ProtectedRoute;
