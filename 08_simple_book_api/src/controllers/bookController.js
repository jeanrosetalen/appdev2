const Book = require("../models/bookModel");
const transporter = require("../middlewares/emailMiddleware");

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ books: books, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get book by Id
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ book: book, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add or create book
const createBook = async (req, res) => {
  try {
    const product = await Book.create(req.body);
    res.json({ success: true, message: "Book is successfully added!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 
//Update book by Id
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    const updatedBook = await Book.findById(id);
    res.json({ success: true, book: updatedBook });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete book by Id
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.json({ success: false, message: "Book not found!" });
    res.json({ success: true, message: "Book is successfully deleted!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// post reserve book
const reserveBook = (req, res) => {
  const { to, subject, text } = req.body;
  const { email: from } = req.user;

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({
          success: false,
          message: error,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Email Sent",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  reserveBook,
};
