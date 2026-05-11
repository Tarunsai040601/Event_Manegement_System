// INITILISATION THE EXPRESS
const express = require("express");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// EXPORT THE AUTHROUTER
const authRouter = require("./Routers/AuthRouters/AuthRouters.js");
const connection = require("./Configuration/Config.js");

// STORE THE EXPRESS DETAILS IN ONE VARIABLE
const app = express();

// TAKING PORT VALUE FROM THE PROTECTED FILE
const port = process.env.PORT || 8015;

// BUILTIN MIDDLEWARES
app.use(express.json()); // json data
app.use(express.urlencoded()); //form data

// ROUTE MIDDLEWARE
app.use("/api", authRouter);

// ARROW FUNCTION
const listenFunction = () => {
  console.log(`server is runing on the port http://localhost:${port}`);
};

// LISTEN
app.listen(port, listenFunction);

// DATABASE CONNECTION
connection;
