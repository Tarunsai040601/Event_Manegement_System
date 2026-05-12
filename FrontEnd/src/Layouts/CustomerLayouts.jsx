import React from "react";
import CustomerNavbar from "../Components/DashBoards/Customer/CustomerNavBar/CustomerNavbar.jsx";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavbar />
      <Outlet />
    </>
  );
};

export default CustomerLayout;