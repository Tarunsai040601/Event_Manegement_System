// INITILISATION THE MONGOOES
const mongoose = require("mongoose");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// TAKING THE AUTH COLLECTION
const customerColection = process.env.CUSTOMERCOLLECTION;

// CREATION THE SCHEMA
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "organizer", "customer"],
  },
});

// CREATION MODEL
const customerModel = mongoose.model(customerColection, customerSchema);

// MODULE EXPORT
module.exports = customerModel;
