import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://emailupdate-941x.onrender.com/organizerPost/get"
        );
        setEvents(res.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  //  SINGLE CLEAN FUNCTION
  const handleBook = (event) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
      });
      navigate("/login");
      return;
    }

    navigate("/booking", { state: { event } });
  };

  return (
    <div className="ev-container">
      <h1 className="ev-title">EventsHub</h1>

      <div className="ev-grid">
        {events.map((item) => (
          <div className="ev-card" key={item._id}>
            
            <img className="ev-img" src={item.image} alt={item.title} />

            <h2>{item.title}</h2>
            <p>{item.desc?.slice(0, 80)}...</p>

            <div className="ev-info">
              <span>💰 {item.price}</span>
              <span>🎟 {item.seatlimit}</span>
            </div>

            <div className="ev-info">
              <span>📍 {item.venu}</span>
              <span>📅 {item.date}</span>
            </div>

            <div className="ev-btns">
              <button onClick={() => setSelectedEvent(item)}>
                See More
              </button>

              <button onClick={() => handleBook(item)}>
                Book Slot
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedEvent && (
        <div className="ev-modal">
          <div className="ev-modal-content">

            <span onClick={() => setSelectedEvent(null)}>✖</span>

            <img src={selectedEvent.image} />

            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.desc}</p>

            <p>Category: {selectedEvent.category}</p>
            <p>Price: {selectedEvent.price}</p>
            <p>Seats: {selectedEvent.seatlimit}</p>
            <p>Venue: {selectedEvent.venu}</p>
            <p>Date: {selectedEvent.date}</p>

            <button onClick={() => handleBook(selectedEvent)}>
              Book Slot
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Events;