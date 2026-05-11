// INITILISATION THE MONGOOES
const mongoose = require("mongoose");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// TAKING THE AUTH COLLECTION
const adminColection = process.env.ADMINCOLLECTION;

// CREATION THE SCHEMA
const adminSchema = new mongoose.Schema({
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
const adminModel = mongoose.model(adminColection, adminSchema);

// MODULE EXPORT
module.exports = adminModel;
