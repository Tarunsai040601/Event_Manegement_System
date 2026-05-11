// INITILISATION THE MONGOOES
const mongoose = require("mongoose");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// TAKING THE AUTH COLLECTION
const organizerColection = process.env.ORGANISERCOLLECTION;

// CREATION THE SCHEMA
const organizerSchema = new mongoose.Schema({
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
const organizerModel = mongoose.model(organizerColection, organizerSchema);

// MODULE EXPORT
module.exports = organizerModel;
