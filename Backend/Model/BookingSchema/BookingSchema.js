const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String, // ✅ ADD THIS (for Nodemailer)
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookings", bookingSchema);