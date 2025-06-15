require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json()); // Middleware for parsing JSON
const router = require("./router/book.route");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


// Welcome Route
app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch(error => console.error("MongoDB connection error:", error));





