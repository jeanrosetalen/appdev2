const express = require("express");

const app = express();
app.use(express.json()); // Middleware for parsing JSON
const books = require("./router/book.route")

const PORT = 3000;

// Welcome Route
app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

