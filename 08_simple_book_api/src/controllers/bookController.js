let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

// Get All Books
const getAllBooks = (req, res) => {
  res.json({ books: books, success: true });
};

// Get book by Id
const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id));
  if (!book) res.json({ success: false, message: "Book not found!" });
  res.json({ book: book, success: true });
};

// Add or create book
const createBook = (req, res) => {
  const { title, author } = req.body;
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book);
  res.json({ success: true, message: "Book is succefully added!" });
};
 
//Update book by Id
const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  let book = books.find((book) => book.id === parseInt(id));
  if (!book) res.json({ success: false, message: "Book not found!" });
  // Update logic here
  book.title = title ?? book.title;
  book.author = author ?? book.author;
  res.json({ book: book, success: true });
};

// Delete book by Id
const deleteBook = (req, res) => {
  const { id } = req.params;
  let book = books.find((book) => book.id === parseInt(id));
  if (!book) res.json({ success: false, message: "Book not found!" });
  books = books.filter((book) => book.id !== parseInt(id));
  res.json({ success: true, message: "Book is succefully deleted!" });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};