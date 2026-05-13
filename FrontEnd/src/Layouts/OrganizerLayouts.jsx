import React from "react";
import OrganizerNavbar from "../Components/DashBoards/Organizer/OragnizerNavbar/OrganizerNavbar.jsx";
import { Outlet } from "react-router-dom";
import EventFooter from "../Components/Footer/EventFooter.jsx";

const OrganizerLayout = () => {
  return (
    <>
      <OrganizerNavbar />
      <Outlet />
      <EventFooter/>
    </>
  );
};

export default OrganizerLayout;