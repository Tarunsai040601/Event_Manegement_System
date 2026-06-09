// INITILISATION THE EXPRESS
const express = require("express");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// cors it is security for interact with frontend and backend
const cors = require("cors");

// EXPORT THE AUTHROUTER
const authRouter = require("./Routers/AuthRouters/AuthRouters.js");

// EXPORT THE ROUTER
const organizerPost = require("./Routers/OrganizerPosts/OrganizerPosts.js");
const Bookingrouter = require("./Routers/BookingRouter/bookingRoutes.js");
const Dataconnection = require("./Configuration/Config.js");

// STORE THE EXPRESS DETAILS IN ONE VARIABLE
const app = express();

// TAKING PORT VALUE FROM THE PROTECTED FILE
const port = process.env.PORT || 8015;

// BUILTIN MIDDLEWARES
app.use(express.json()); // json data & here app.use () is method
app.use(express.urlencoded()); //form data

// Core
app.use(cors());

// ROUTE MIDDLEWARE
app.use("/api", authRouter); //auth router
app.use("/organizerPost", organizerPost); // organizer post router
app.use("/booking", Bookingrouter); // booking router

// ARROW FUNCTION
const listenFunction = () => {
  console.log(`server is runing on the port http://localhost:${port}`);
};

// LISTEN
app.listen(port, listenFunction);

// DataBase connection calling
Dataconnection;
