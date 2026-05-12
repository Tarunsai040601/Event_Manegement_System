import React from "react";
import OrganizerNavbar from "../Components/DashBoards/Organizer/OragnizerNavbar/OrganizerNavbar.jsx";
import { Outlet } from "react-router-dom";

const OrganizerLayout = () => {
  return (
    <>
      <OrganizerNavbar />
      <Outlet />
    </>
  );
};

export default OrganizerLayout;