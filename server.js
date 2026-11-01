// Main file: starts the Express server
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// This lets Express read JSON from the request body
app.use(express.json());

// Home route to check that the API is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Records API is running" });
});

// All student routes start with /api/students
app.use("/api/students", studentRoutes);

// Unknown route -> 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// If JSON body is broken, send 400 instead of crashing
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

// Connect to database first, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
});
