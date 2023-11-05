import axios from "axios";

// Action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

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
        userData // Utilisez directement l'objet JavaScript userData
      );

      console.log(response.data);
      // Si la connexion réussit, dispatche l'action de succès
      dispatch(loginSuccess(response.data));
    } catch (error) {
      // Si la connexion échoue, dispatche l'action d'échec
      dispatch(loginFailure(error.message));
    }
  };
};
