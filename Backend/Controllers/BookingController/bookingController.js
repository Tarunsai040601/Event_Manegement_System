const Booking = require("../../Model/BookingSchema/BookingSchema.js");
const sendMail = require("../../utils/sendMail.js");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { name, location, age, qualification, eventName } = req.body;

    const email = req.user?.email;

    console.log("Logged User:", req.user);
    console.log("Recipient Email:", email);

    if (!name || !location || !age || !qualification || !eventName || !email) {
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

    // send response immediately
    res.status(201).json({
      message: "Booking successful",
      data: newBooking,
    });

    // send email in background
    sendMail(
      email,
      "🎉 Event Booking Confirmation",
      `
      <div style="font-family: Arial, sans-serif; background:#f4f6f9; padding:30px;">
        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 4px 12px rgba(0,0,0,0.15);
        ">

          <div style="
            background:linear-gradient(135deg,#28a745,#20c997);
            color:white;
            padding:25px;
            text-align:center;
          ">
            <h1 style="margin:0;">✅ Booking Confirmed</h1>
            <p style="margin-top:8px;">Your event has been booked successfully</p>
          </div>

          <div style="padding:30px; color:#333;">
            <h2>Hello ${name}, 👋</h2>
            <p>Your booking has been confirmed successfully.</p>

            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr>
                <td style="padding:12px; border:1px solid #ddd;"><b>🎫 Event</b></td>
                <td style="padding:12px; border:1px solid #ddd;">${eventName}</td>
              </tr>
              <tr>
                <td style="padding:12px; border:1px solid #ddd;"><b>📍 Location</b></td>
                <td style="padding:12px; border:1px solid #ddd;">${location}</td>
              </tr>
              <tr>
                <td style="padding:12px; border:1px solid #ddd;"><b>🎂 Age</b></td>
                <td style="padding:12px; border:1px solid #ddd;">${age}</td>
              </tr>
              <tr>
                <td style="padding:12px; border:1px solid #ddd;"><b>🎓 Qualification</b></td>
                <td style="padding:12px; border:1px solid #ddd;">${qualification}</td>
              </tr>
            </table>

            <div style="
              margin-top:25px;
              padding:15px;
              background:#e8f8ee;
              border-left:5px solid #28a745;
              border-radius:8px;
            ">
              <p style="margin:0; color:#155724;">
                🎉 <b>Status:</b> Approved & Confirmed
              </p>
            </div>

            <p style="margin-top:25px;">
              Thank you for booking with us 🙌 <br/>
              We look forward to seeing you at the event.
            </p>
          </div>

          <div style="
            background:#f8f9fa;
            padding:18px;
            text-align:center;
            font-size:14px;
            color:#666;
          ">
            © 2026 Event Management System | All Rights Reserved
          </div>
        </div>
      </div>
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

// GET BOOKINGS
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