import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Register from "./Pages/Register/Register.jsx";
import Login from "./Pages/Login/Login.jsx";

// Layouts
import AdminLayouts from "./Layouts/AdminLayouts.jsx";
import OrganizerLayouts from "./Layouts/OrganizerLayouts.jsx";
import CustomerLayouts from "./Layouts/CustomerLayouts.jsx";

// Protected Route Component
const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* default → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* auth pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayouts />
          </ProtectedRoute>
        }
      />

      {/* Organizer Dashboard */}
      <Route
        path="/organizer/*"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerLayouts />
          </ProtectedRoute>
        }
      />

      {/* Customer Dashboard */}
      <Route
        path="/customer/*"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerLayouts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;