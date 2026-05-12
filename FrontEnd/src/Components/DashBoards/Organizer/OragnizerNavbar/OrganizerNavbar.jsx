import React, { useState } from "react";
import "./OrganizerNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const OrganizerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logout from organizer dashboard?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#00c6ff",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        Swal.fire({
          icon: "success",
          title: "Logged Out Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    });
  };

  return (
    <nav className="organizer-navbar">
      <div className="organizer-logo">
        <h1>Organizer Dashboard</h1>
      </div>

      <div className={`organizer-links ${menuOpen ? "active" : ""}`}>
        <Link to="/organizer/eventsupload" onClick={() => setMenuOpen(false)}>
          EventsUpload
        </Link>

        <Link to="/organizer/showEvents" onClick={() => setMenuOpen(false)}>
          ShowEvents
        </Link>

        <Link to="/organizer/bookedevents" onClick={() => setMenuOpen(false)}>
          BookedEvents
        </Link>

        <button className="mobile-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <button className="logout-btn desktop-btn" onClick={handleLogout}>
        Logout
      </button>

      <div
        className="organizer-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default OrganizerNavbar;