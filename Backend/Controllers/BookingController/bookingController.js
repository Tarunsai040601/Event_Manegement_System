const Booking = require("../../Model/BookingSchema/BookingSchema.js");


// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { name, location, age, qualification, eventName } = req.body;

    console.log("Booking Request Body:", req.body);
    console.log("Decoded User:", req.user);

    const email = req.user?.email;

    console.log("Recipient Email:", email);

    // validation
    if (!name || !location || !age || !qualification || !eventName || !email) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // duplicate booking check
    const existingBooking = await Booking.findOne({
      email,
      eventName,
    });

    if (existingBooking) {
      console.log("Duplicate booking found");
      return res.status(400).json({
        message: "You already have booked this event",
      });
    }

    // save booking
    const newBooking = new Booking({
      name,
      email,
      location,
      age,
      qualification,
      eventName,
    });

    await newBooking.save();
    console.log("Booking saved successfully");

    // immediate response
    res.status(201).json({
      message: "Booking successful",
      data: newBooking,
    });



  } catch (error) {
    console.log("Controller Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BOOKINGS
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    console.log("Fetch Booking Error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};