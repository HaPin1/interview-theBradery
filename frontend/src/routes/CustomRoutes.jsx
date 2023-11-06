import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginComponent from "../components/Authentication/LoginComponent";
import HomeComponent from "../components/Product/HomeComponent";
import CartComponent from "../components/Product/CartComponent";
import { useSelector } from "react-redux";
import ProductDetail from "../components/Product/ProductComponent";
import RegisterComponent from "../components/Authentication/RegisterComponent";

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
      <Route path="register" element={<RegisterComponent />} />
      <Route element={<ProtectedRoute logged={isLoggedIn} />}>
        <Route path="" element={<HomeComponent />} />
        <Route path="cart" element={<CartComponent />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
};

export default CustomRoutes;
