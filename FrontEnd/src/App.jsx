import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";

const App = () => {
  return (
    
      <Routes>

        {/* default → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    
  );
};

export default App;