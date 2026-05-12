import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    location: "",
    age: "",
    qualification: "",
  });

  // 🔐 Redirect if event missing
  useEffect(() => {
    if (!event) {
      navigate("/events");
    }
  }, [event, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 login check
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
      });
      navigate("/login");
      return;
    }

    try {
      const payload = {
        name: username,
        location: formData.location,
        age: formData.age,
        qualification: formData.qualification,
        eventName: event?.title,
      };

      const res = await axios.post(
        "http://localhost:8015/booking/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ success + redirect to events on OK click
      Swal.fire({
        icon: "success",
        title: "Booking Successful",
        text: res.data.message,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/events"); // 🔥 go to events page
      });

    } catch (error) {
      const msg = error.response?.data?.message;

      // 🚫 duplicate booking
      if (msg === "You already have booked this event") {
        Swal.fire({
          icon: "warning",
          title: "Already Booked",
          text: "You already have booked this event",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: msg || "Booking Failed",
        });
      }
    }
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>

      <form onSubmit={handleSubmit} className="booking-form">

        {/* 👤 Username */}
        <input
          type="text"
          value={username || ""}
          readOnly
        />

        {/* 🎯 Event Name */}
        <input
          type="text"
          value={event?.title || ""}
          readOnly
        />

        {/* 📍 Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        {/* 🎂 Age */}
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />

        {/* 🎓 Qualification */}
        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;