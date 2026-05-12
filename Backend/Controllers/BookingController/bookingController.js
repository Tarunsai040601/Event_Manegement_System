const Booking = require("../../Model/BookingSchema/BookingSchema.js");

// ================= CREATE BOOKING =================
const createBooking = async (req, res) => {
  try {
    const {
      name,
      location,
      age,
      qualification,
      eventName,
    } = req.body;

    if (!name || !location || !age || !qualification || !eventName) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // 🔥 DUPLICATE CHECK (MAIN FIX)
    const existingBooking = await Booking.findOne({
      name,
      eventName,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already have booked this event",
      });
    }

    const newBooking = new Booking({
      name,
      location,
      age,
      qualification,
      eventName,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking successful",
      data: newBooking,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= GET BOOKINGS =================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};