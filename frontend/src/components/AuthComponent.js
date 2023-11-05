// AuthComponent.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";

const AuthComponent = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return isLoggedIn ? <LogoutComponent /> : <LoginComponent />;
};

export default AuthComponent;
