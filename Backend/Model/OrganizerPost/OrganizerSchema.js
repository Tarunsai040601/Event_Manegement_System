const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

let collection = process.env.ORGANISER;

let postOrganizer = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  category: { type: String, required: true },
  venu: { type: String, required: true },
  seatlimit: { type: Number, required: true },
  date: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
});

// create model
const postModel = mongoose.model(collection, postOrganizer);
module.exports = postModel;
