import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import HomeComponent from "../components/HomeComponent";
import CartComponent from "../components/CartComponent";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ logged, redirectPath = "/login", children }) => {
  if (!logged) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const CustomRoutes = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Routes>
      <Route path="login" element={<LoginComponent />} />
      <Route element={<ProtectedRoute logged={isLoggedIn} />}>
        <Route path="" element={<HomeComponent />} />
        <Route path="cart" element={<CartComponent />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
