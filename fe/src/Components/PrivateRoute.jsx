import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const type = localStorage.getItem("role");

  const checkURLPrefix = () => {
    const path = location.pathname;
    if (type === "Admin" && path.startsWith("/admin")) {
      return true;
    } else if (type === "Operator" && path.startsWith("/operator")) {
      return true;
    }
    return false;
  };

  return isAuthenticated && checkURLPrefix() ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
