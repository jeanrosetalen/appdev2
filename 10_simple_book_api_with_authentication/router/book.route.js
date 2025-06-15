const express = require("express");
const Book = require("../models/book.model");
const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();


// GET: Retrieve all books | (requires authentication)
router.get("/", authMiddleware, async (req, res) => {
  const books = await Book.find();
  res.json(books);

});

// GET: Retrieve book by ID | (requires authentication)
router.get("/:id", authMiddleware, async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
     res.json(book);
});

// POST: Add a new book | (requires authentication)
router.post("/", authMiddleware, async (req, res) => {

//   const newBook = { id: books.length + 1, title, author };

    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and Author are required" });

    const newBook = new Book({ title, author });
    await newBook.save();
    res.status(201).json(newBook);

});

// PATCH: Update book details | (requires authentication)
router.patch("/:id", authMiddleware, async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);

});

// DELETE: Remove a book | (requires authentication)
router.delete("/:id", authMiddleware, async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });

});

module.exports = router;