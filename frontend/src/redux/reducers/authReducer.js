import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  LOGOUT,
} from "../actions/authActions";

const storedUsername = localStorage.getItem("username");
const storedJwt = localStorage.getItem("jwt");

const initialState = {
  isLoggedIn: storedUsername && storedJwt,
  user: storedUsername || null,
  jwt: storedJwt || null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.username,
        jwt: action.payload.token,
        loading: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default authReducer;
