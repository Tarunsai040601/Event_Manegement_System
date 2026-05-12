import React from "react";
import "./AdminHome.css";
import { FaUsers, FaCalendarAlt, FaBookOpen } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="admin-container">
      <h1 className="title">UsersVisualization</h1>

      <div className="stats-wrapper">

        {/* Top Row */}
        <div className="top-row">

          <div className="card users">
            <FaUsers className="icon" />
            <h2>Users</h2>
            <p>1200</p>

            <div className="graph">
              <span style={{ height: "30%" }}></span>
              <span style={{ height: "60%" }}></span>
              <span style={{ height: "45%" }}></span>
              <span style={{ height: "80%" }}></span>
            </div>
          </div>

          <div className="card events">
            <FaCalendarAlt className="icon" />
            <h2>Events</h2>
            <p>350</p>

            <div className="graph">
              <span style={{ height: "50%" }}></span>
              <span style={{ height: "70%" }}></span>
              <span style={{ height: "40%" }}></span>
              <span style={{ height: "90%" }}></span>
            </div>
          </div>

        </div>

        {/* Bottom Center */}
        <div className="bottom-row">

          <div className="card bookings">
            <FaBookOpen className="icon" />
            <h2>Bookings</h2>
            <p>890</p>

            <div className="graph">
              <span style={{ height: "40%" }}></span>
              <span style={{ height: "65%" }}></span>
              <span style={{ height: "55%" }}></span>
              <span style={{ height: "75%" }}></span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminHome;