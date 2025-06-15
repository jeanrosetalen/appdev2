const express = require("express");
const books = require("../models/book.model")

const router = express.Router();


// GET: Retrieve all books
router.get("/api/books", (req, res) => {
  res.json(books);
});

// GET: Retrieve book by ID
router.get("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

// POST: Add a new book
router.post("/api/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH: Update book details
router.patch("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (req.body.title) book.title = req.body.title;
  if (req.body.author) book.author = req.body.author;

  res.json(book);
});

// DELETE: Remove a book
router.delete("/api/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted successfully" });
});

module.exports = router;