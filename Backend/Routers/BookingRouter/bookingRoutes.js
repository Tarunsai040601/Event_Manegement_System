const express = require("express");
const Bookingrouter = express.Router();

const {
  createBooking,
  getMyBookings,
} = require("../../Controllers/BookingController/bookingController.js");
const authMiddleware = require("../../Middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../Middleware/RoleMiddleware/RoleMiddleware.js");

//  ONLY CUSTOMER CAN BOOK
Bookingrouter.post(
  "/create",
  authMiddleware,
  roleMiddleware("customer"),
  createBooking,
);

//  USER BOOKINGS
Bookingrouter.get(
  "/my",
  getMyBookings
);

module.exports = Bookingrouter;
