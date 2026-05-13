import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../Components/DashBoards/Admin/AdminNavbar/AdminNavBar.jsx";
import EventFooter from "../Components/Footer/EventFooter.jsx";
const AdminLayout = () => {
  return (
    <>
      <AdminNavBar/>
      <Outlet />
      <EventFooter/>
    </>
  );
};

export default AdminLayout;