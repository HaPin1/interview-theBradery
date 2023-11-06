import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomRoutes from "./routes/CustomRoutes";

const App = () => {
  return (
    <Router>
      <Navbar />
      <CustomRoutes />
    </Router>
  );
};

export default App;
