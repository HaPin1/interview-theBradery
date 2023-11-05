import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthComponent from "./components/AuthComponent"; // Votre composant d'authentification
// Importez vos autres composants ou pages ici

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
