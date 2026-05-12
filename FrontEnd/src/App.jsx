import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./Layouts/CustomerLayouts.jsx";
import AdminLayout from "./Layouts/AdminLayouts.jsx";
import OrganizerLayout from "./Layouts/OrganizerLayouts.jsx";

import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";


const App = () => {
  return (
    
      <Routes>

        {/* Customer routes default */}
        <Route path="/" element={<CustomerLayout />}>
       
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
      
        </Route>

        {/* Organizer routes */}
        <Route path="/organizer" element={<OrganizerLayout />}>
         
        </Route>

        {/* Common */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

      </Routes>
   
  );
};

export default App;