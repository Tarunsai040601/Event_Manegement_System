const Booking = require("../../Model/BookingSchema/BookingSchema.js");
const sendMail = require("../../utils/sendMail.js");

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

    // send email in background
    sendMail(
      email,
      "🎉 Event Booking Confirmation",
      `
      <div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">
    
        <div style="
          max-width:650px;
          margin:30px auto;
          background:#ffffff;
          border-radius:15px;
          overflow:hidden;
          box-shadow:0 6px 18px rgba(0,0,0,0.15);
        ">

          <div style="
            background:linear-gradient(135deg,#28a745,#20c997);
            color:white;
            padding:30px;
            text-align:center;
          ">
            <h1 style="margin:0;font-size:28px;">✅ Booking Approved</h1>
            <p style="margin-top:10px;font-size:16px;">
              Your event booking has been confirmed successfully
            </p>
          </div>

          <div style="padding:30px;color:#333;">
            <h2 style="margin-top:0;">Hello ${name} 👋</h2>

            <p>
              Great news! Your booking request has been 
              <span style="color:#28a745;font-weight:bold;">
                approved successfully
              </span>.
            </p>

            <div style="
              margin-top:20px;
              border:1px solid #e5e5e5;
              border-radius:10px;
              overflow:hidden;
            ">

              <div style="display:flex;border-bottom:1px solid #eee;">
                <div style="width:40%;padding:14px;background:#fafafa;font-weight:bold;">🎫 Event Name</div>
                <div style="width:60%;padding:14px;">${eventName}</div>
              </div>

              <div style="display:flex;border-bottom:1px solid #eee;">
                <div style="width:40%;padding:14px;background:#fafafa;font-weight:bold;">📍 Location</div>
                <div style="width:60%;padding:14px;">${location}</div>
              </div>

              <div style="display:flex;border-bottom:1px solid #eee;">
                <div style="width:40%;padding:14px;background:#fafafa;font-weight:bold;">🎂 Age</div>
                <div style="width:60%;padding:14px;">${age}</div>
              </div>

              <div style="display:flex;">
                <div style="width:40%;padding:14px;background:#fafafa;font-weight:bold;">🎓 Qualification</div>
                <div style="width:60%;padding:14px;">${qualification}</div>
              </div>
            </div>

            <div style="
              margin-top:25px;
              background:#e9f9ef;
              border-left:5px solid #28a745;
              padding:16px;
              border-radius:8px;
            ">
              <p style="margin:0;color:#155724;font-weight:bold;">
                🎉 Status: Approved & Confirmed
              </p>
            </div>

            <p style="margin-top:25px;line-height:1.7;">
              Thank you for choosing our Event Management platform.  
              We are excited to have you at the event 🙌
            </p>
          </div>

          <div style="
            background:#f8f9fa;
            padding:18px;
            text-align:center;
            color:#666;
            font-size:14px;
          ">
            © 2026 Event Management System <br/>
            All Rights Reserved
          </div>
        </div>
      </div>
      `
    ).catch((err) => {
      console.log("Email failed:", err.message);
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