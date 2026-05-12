import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./Layouts/CustomerLayouts.jsx";
import AdminLayout from "./Layouts/AdminLayouts.jsx";
import OrganizerLayout from "./Layouts/OrganizerLayouts.jsx";

import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import CustomerHome from "./Components/DashBoards/Customer/CustomerHome/CustomerHome.jsx";
import OrganizerHome from "./Components/DashBoards/Organizer/OrganizerHome/Organizer.jsx";
import AdminHome from "./Components/DashBoards/Admin/AdminHome/AdminHome.jsx";
import ShowEvents from "./Components/DashBoards/Organizer/OrganizerPost/ShowEvents/ShowEvents.jsx";
import OrganizerPost from "./Components/DashBoards/Organizer/OrganizerPost/OrganizerPost.jsx";

const App = () => {
  return (
    <Routes>
      {/* Customer routes default */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<CustomerHome />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
      </Route>

      {/* Organizer routes */}
      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerHome />} />

        <Route path="/organizer/eventsupload" element={<OrganizerPost/>} />
        <Route path="/organizer/showevents" element={<ShowEvents />} />
      </Route>

      {/* Common */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
