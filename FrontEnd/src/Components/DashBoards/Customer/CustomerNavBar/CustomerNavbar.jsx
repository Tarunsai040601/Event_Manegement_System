import React, { useState } from "react";
import "./CustomerNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const CustomerNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
const token = sessionStorage.getItem("token");
const username = sessionStorage.getItem("username");
const role = sessionStorage.getItem("role");

  const isCustomerLoggedIn = token && role === "customer";

  const handleLogin = () => {
    Swal.fire({
      title: "Login Required",
      text: "Do you want to go to login page?",
      icon: "question",
      confirmButtonText: "Yes Login",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
sessionStorage.removeItem("username");
sessionStorage.removeItem("role");

        navigate("/login");
        window.location.reload();
      }
    });
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <h1>EventManagement</h1>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/events" onClick={() => setMenuOpen(false)}>
          Events
        </Link>

        <Link to="/booking" onClick={() => setMenuOpen(false)}>
          BookingEvent
        </Link>

        {isCustomerLoggedIn ? (
          <>
            <span className="mobile-welcome-text">
              Welcome :Hi..! {username} 👋
            </span>

            <button
              className="mobile-login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="mobile-login-btn"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>

      {/* Desktop User Section */}
      {isCustomerLoggedIn ? (
        <div className="desktop-user-section">
          <span className="welcome-text">
            Welcome :Hi..! {username} 👋
          </span>

          <button
            className="login-btn desktop-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="login-btn desktop-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      )}

      {/* Toggle */}
      <div
        className="toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default CustomerNavbar;