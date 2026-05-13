import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayEvents.css";

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://event-manegement-system-1.onrender.com/organizerPost/get"
        );

        const data =
          res.data?.data ||
          res.data?.events ||
          res.data?.result ||
          res.data ||
          [];

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="org-container">
      <h1 className="org-title">Organizer Events</h1>

      <div className="org-grid">
        {loading ? (
          <p className="org-msg">Loading...</p>
        ) : events.length === 0 ? (
          <p className="org-msg">No Events Found</p>
        ) : (
          events.map((event, index) => (
            <div className="org-card" key={index}>

              <div className="org-img">
                <img
                  src={
                    event.image ||
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                  }
                  alt="event"
                />
              </div>

              <div className="org-body">
                <h2>{event.title}</h2>
                <p>{event.desc}</p>

                <div className="org-info">
                  <span>📍 {event.venu}</span>
                  <span>📅 {event.date}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayEvents;