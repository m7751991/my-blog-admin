import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: React.FC<{ element: ReactNode }> = ({ element }) => {
  const isAuthenticated = true;
  // const isAuthenticated = localStorage.getItem("authToken") !== null;
  return <>{isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
