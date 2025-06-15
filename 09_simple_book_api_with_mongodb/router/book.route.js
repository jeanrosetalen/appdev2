const express = require("express");
const Book = require("../models/book.model")

const router = express.Router();


// GET: Retrieve all books
router.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);

});

// GET: Retrieve book by ID
router.get("/api/books/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
     res.json(book);
});

// POST: Add a new book
router.post("/api/books", async (req, res) => {

//   const newBook = { id: books.length + 1, title, author };

    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and Author are required" });

    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);

});

// PATCH: Update book details
router.patch("/api/books/:id", async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);

});

// DELETE: Remove a book
router.delete("/api/books/:id", async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });

});

module.exports = router;