import React, { useEffect, useState } from "react";
import "./CustomerHome.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "Wedding Event Management",
    description:
      "Plan unforgettable weddings with elegant decorations, catering, and venue arrangements.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Concert Event Planning",
    description:
      "Manage live concerts, artist bookings, sound systems, and crowd organization efficiently.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    title: "Corporate Events",
    description:
      "Professional management for business meetings, conferences, seminars, and networking events.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
    title: "Birthday Celebrations",
    description:
      "Create joyful birthday experiences with themes, cakes, decorations, and entertainment.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
    title: "Festival Event Services",
    description:
      "Handle cultural festivals, public celebrations, and large-scale entertainment programs.",
  },
];

const CustomerHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="customer-home">
      <div
        className="slider"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
        }}
      >
        <div className="overlay">
          <div className="content">
            <h1>{slides[currentSlide].title}</h1>
            <p>{slides[currentSlide].description}</p>
            <button>Explore Events</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;