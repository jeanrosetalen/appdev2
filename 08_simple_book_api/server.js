const express = require("express");
const bookRouter = require("./src/routers/bookRouter");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/books", bookRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});