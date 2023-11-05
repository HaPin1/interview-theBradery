// LogoutComponent.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";

const LogoutComponent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
