import React, { useEffect, useState } from "react";
import "./ShowEvents.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://updatedcode-uyu5.onrender.com/organizerPost/get"
      );

      setEvents(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch events",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete Event
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "Do you want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem("token");

          await axios.delete(
            `https://updatedcode-uyu5.onrender.com/organizerPost/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: "Deleted Successfully",
            timer: 1500,
            showConfirmButton: false,
          });

          fetchEvents();
        } catch (error) {
          console.log(error.response?.data || error.message);

          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text:
              error.response?.data?.message ||
              "Something went wrong",
          });
        }
      }
    });
  };

  // Update Event
  const handleUpdate = (event) => {
    navigate("/organizer/eventsupload", {
      state: { event },
    });
  };

  return (
    <div className="events-page">
      <div className="events-container">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((item) => (
            <div className="event-card" key={item._id}>
              <img src={item.image} alt={item.title} />

              <div className="event-card-body">
                <h2>{item.title}</h2>

                <p className="event-desc">{item.desc}</p>

                <div className="event-meta">
                  <span> Category  : {item.category}</span>
                  <span>📍Location : {item.venu}</span>
                  <span>🪑AvaliableSeats : {item.seatlimit} seats</span>
                  <span>📅Date          :{item.date}</span>
                  <span className="event-price">
                    Cost₹      :{item.price}
                  </span>
                </div>

                <div className="btn-group">
                  <button
                    className="btn-update"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="no-events">No Events Available</h1>
        )}
      </div>
    </div>
  );
};

export default ShowEvents;