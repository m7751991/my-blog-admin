import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ element: ReactNode }> = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authorization") !== null;
  return <>{isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />}</>;
};

export default PrivateRoute;
