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

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    age: "",
    qualification: "",
  });

  // redirect if event missing
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

    // login check
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
      });
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: username,
        location: formData.location,
        age: formData.age,
        qualification: formData.qualification,
        eventName: event?.title,
      };

      const res = await axios.post(
        "https://emailcase.onrender.com/booking/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Booking Successful 🎉",
        text: res.data.message,
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/events");
      });

    } catch (error) {
      const msg = error.response?.data?.message;

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>

      <form onSubmit={handleSubmit} className="booking-form">

        {/* USER */}
        <input type="text" value={username || ""} readOnly />

        {/* EVENT */}
        <input type="text" value={event?.title || ""} readOnly />

        {/* LOCATION */}
        <input
          type="text"
          name="location"
          placeholder="Enter Location"
          onChange={handleChange}
          required
        />

        {/* AGE */}
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          onChange={handleChange}
          required
        />

        {/* QUALIFICATION */}
        <input
          type="text"
          name="qualification"
          placeholder="Enter Qualification"
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>

      </form>
    </div>
  );
};

export default Booking;