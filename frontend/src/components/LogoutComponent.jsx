import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/login`, { replace: true });

  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutComponent;
