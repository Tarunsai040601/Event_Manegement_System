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
import Events from "./Components/DashBoards/Customer/Events/Events.jsx";
import Booking from "./Components/DashBoards/Customer/BookingSlots/Booking.jsx";
import DisplayEvents from "./Components/DashBoards/Admin/DisplayEvents/DisplayEvents.jsx";
import BookedEvents from "./Components/DashBoards/Admin/BookedEvents/BookedEvents.jsx";
import BookEvent from "./Components/DashBoards/Organizer/BookEvent/BookEvent.jsx";


const App = () => {
  return (
    <Routes>
      {/* Customer routes default */}
       <Route path="/" element={<CustomerLayout />}>
        
        {/* default page */}
        <Route index element={<CustomerHome />} />

        {/* other customer pages */}
        <Route path="events" element={<Events/>} />
        <Route path="/booking" element={<Booking/>} />
       

      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/admin/events" element={<DisplayEvents/>}/>
        <Route path="/admin/bookedevents" element={<BookedEvents/>}/>
      </Route>

      {/* Organizer routes */}
      <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerHome />} />
        <Route path="/organizer/eventsupload" element={<OrganizerPost/>} />
        <Route path="/organizer/showevents" element={<ShowEvents />} />
        <Route path="/organizer/bookedevents" element={<BookEvent/>}/>
      </Route>

      {/* Common */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
