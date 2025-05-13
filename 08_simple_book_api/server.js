const express = require('express');
const app = express();
const port = 3000

app.use(express.json()); // Middleware to parse JSON data

// In-memory book collection
let books = [
    { id: 1, title: "Rich Dad, Poor Dad", author: "Robert Kiyosaki" },
    { id: 2, title: "What Every Body is Saying", author: "Joe Navarro" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// Welcome message
app.get('/', (req, res) => {
    res.send("Simple Book API using Node.js and Express");
});

// Get all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Get a specific book by ID
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// Add a new book
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book by ID
app.patch('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;

    res.json(book);
});

// Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

