import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookEvent.css";

const BookEvent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        "https://emailupdate-941x.onrender.com/booking/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        res.data?.data ||
        res.data?.bookings ||
        res.data?.result ||
        res.data ||
        [];

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="book-container">
      <h1 className="book-title">Customer Booked Events</h1>

      <div className="table-wrapper">
        {loading ? (
          <p className="msg">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="msg">No Bookings Found</p>
        ) : (
          <table className="book-table">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Qualification</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{b.name || "N/A"}</td>
                  <td>{b.email || "N/A"}</td>
                  <td>{b.eventName || "N/A"}</td>
                  <td>{b.location || "N/A"}</td>
                  <td>{b.qualification || "N/A"}</td>
                  <td>{b.age || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookEvent;