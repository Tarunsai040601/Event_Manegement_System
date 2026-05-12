import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavBar from "../Components/DashBoards/Admin/AdminNavbar/AdminNavBar.jsx";
const AdminLayout = () => {
  return (
    <>
      <AdminNavBar/>
      <Outlet />
    </>
  );
};

export default AdminLayout;