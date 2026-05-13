import React, { useState } from "react";
import "./AdminNavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logout from admin dashboard?",
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
    <nav className="admin-navbar">

      {/*  CLICKABLE LOGO / TITLE */}
      <div
        className="admin-logo"
        onClick={() => navigate("/admin")}
        style={{ cursor: "pointer" }}
      >
        <h1>Admin Dashboard</h1>
      </div>

      <div className={`admin-links ${menuOpen ? "active" : ""}`}>
        <Link to="/admin/events" onClick={() => setMenuOpen(false)}>
          Events
        </Link>

        <Link to="/admin/bookedevents" onClick={() => setMenuOpen(false)}>
          BookedEvents
        </Link>

        <button className="mobile-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <button className="logout-btn desktop-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="admin-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default AdminNavBar;