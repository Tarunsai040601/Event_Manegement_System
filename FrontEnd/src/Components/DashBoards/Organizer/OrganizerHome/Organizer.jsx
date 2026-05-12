import React from "react";
import "./Organizer.css";

const Organizer = () => {
  return (
    <div className="organizer-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1>Organizer Event Management</h1>
            <p>
              Plan, organize, and manage successful events with
              seamless booking, scheduling, and coordination.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="event-card">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Educational Event"
          />
          <h2>Educational Events</h2>
          <p>
            Organize seminars, workshops, training sessions,
            and student conferences efficiently.
          </p>
        </div>

        <div className="event-card">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="IT Event"
          />
          <h2>IT Conferences</h2>
          <p>
            Manage hackathons, tech meetups, coding events,
            and startup conferences.
          </p>
        </div>

        <div className="event-card">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
            alt="Music Event"
          />
          <h2>Music & Festivals</h2>
          <p>
            Conduct concerts, festivals, DJ nights, and
            entertainment events smoothly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Organizer;