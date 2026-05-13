const Booking = require("../../Model/BookingSchema/BookingSchema.js");
const sendMail = require("../../utils/sendMail.js");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { name, location, age, qualification, eventName } = req.body;
    const email = req.user?.email;

    if (!name || !location || !age || !qualification || !eventName || !email) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // duplicate check
    const existingBooking = await Booking.findOne({
      email,
      eventName,
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already have booked this event",
      });
    }

    const newBooking = new Booking({
      name,
      email,
      location,
      age,
      qualification,
      eventName,
    });

    await newBooking.save();

    // RESPONSE FIRST
    res.status(201).json({
      message: "Booking successful",
      data: newBooking,
    });

    // EMAIL IN BACKGROUND
    sendMail(
      email,
      "🎉 Event Booking Confirmation",
      `
        <h2>Booking Successful 🎉</h2>
        <p>Hi ${name},</p>

        <p>You successfully booked:</p>
        <h3>${eventName}</h3>

        <p><b>Location:</b> ${location}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Qualification:</b> ${qualification}</p>

        <br/>
        <p>Thank you for booking with us 🙌</p>
      `
    ).catch((err) => {
      console.log("Email failed:", err.message);
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};