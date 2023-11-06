import axios from "axios";
import {} from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => {
  localStorage.setItem("username", userData.username);
  localStorage.setItem("jwt", userData.token);

  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("jwt");

  return {
    type: LOGOUT,
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const userData = {
        username: username,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  };
};

export const register = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const userData = {
        username: username,
        password: password,
      };

      await axios.post("http://localhost:3000/auth/register", userData);
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw error;
    }
  };
};
