import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const IsAuthenticated = localStorage.getItem("token");
  return <>{IsAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
