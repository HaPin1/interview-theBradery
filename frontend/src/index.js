import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/reducers/authReducer";
import App from "./App";

// Création du store Redux avec configureStore de Redux Toolkit et le rootReducer
const store = configureStore({
  reducer: authReducer,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
