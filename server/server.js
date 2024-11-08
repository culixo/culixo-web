// server/server.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const connectDB = require("./config/db");

const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log("UNHANDLED Exception.. SHUTTING DOWN");
  process.exit(1); //1 MEANS REJECTION
});

// Connect Database
connectDB();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION.. SHUTTING DOWN");
  server.close(() => {
    //wew r giving server a time to finish it process that are still pending
    process.exit(1); //1 MEANS REJECTION
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED.. SHUTTING DOWN");
  server.close(() => {
    //Sigterm itself cause the server shutDown
    console.log("Process Terminated");
  });
});
