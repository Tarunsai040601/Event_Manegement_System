// INITILISATION THE MONGOOES
const mongoose = require("mongoose");

// INITILSATION THE DOTENV FILE
const dotenv = require("dotenv").config();

// TAKING THE DBSTRING
const string = process.env.DBCONNECTION;

// TAKING THE DBNAME
const name = process.env.DBNAME;

// CREATING THE FUNCTION FOR DB CONNECTIONS
async function DatabaseConnection() {
  try {
    const data = await mongoose.connect(string, { dbName: name });
    console.log(
      `Database connected sucessfully on port ${process.env.DBPORT} to the dataBase ${name}`,
    );
  } catch (error) {
    console.log(
      `Database connection issue on port ${process.env.DBPORT} to the dataBase ${name}`,
    );
  }
}

const Dataconnection=DatabaseConnection()
module.exports=Dataconnection
