import React from "react";
import CustomerNavbar from "../Components/DashBoards/Customer/CustomerNavBar/CustomerNavbar.jsx";
import { Outlet } from "react-router-dom";
import EventFooter from "../Components/Footer/EventFooter.jsx";

const CustomerLayout = () => {
  return (
    <>
      <CustomerNavbar />
      <Outlet />
      <EventFooter/>
    </>
  );
};

export default CustomerLayout;