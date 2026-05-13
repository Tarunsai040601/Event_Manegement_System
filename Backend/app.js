// INITILISATION THE EXPRESS
const express = require("express");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// corss
const cors=require('cors')

// EXPORT THE AUTHROUTER
const authRouter = require("./Routers/AuthRouters/AuthRouters.js");
const organizerPost = require("./Routers/OrganizerPosts/OrganizerPosts.js");
const Bookingrouter = require("./Routers/BookingRouter/bookingRoutes.js");
const Dataconnection = require("./Configuration/Config.js");

// STORE THE EXPRESS DETAILS IN ONE VARIABLE
const app = express();

// TAKING PORT VALUE FROM THE PROTECTED FILE
const port = process.env.PORT || 8015;

// BUILTIN MIDDLEWARES
app.use(express.json()); // json data
app.use(express.urlencoded()); //form data

// Core
app.use(cors())

// ROUTE MIDDLEWARE
app.use("/api", authRouter);
app.use("/organizerPost",organizerPost);
app.use("/booking",Bookingrouter)

// ARROW FUNCTION
const listenFunction = () => {
  console.log(`server is runing on the port http://localhost:${port}`);
};


// LISTEN
app.listen(port, listenFunction);
Dataconnection
