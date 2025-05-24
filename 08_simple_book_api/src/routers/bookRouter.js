const express = require("express");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  reserveBook,
} = require("../controllers/bookController");
const { authenticateToken } = require("../middlewares/jwTokenMiddleware");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.patch("/:id", updateBook);

router.delete("/:id", deleteBook);

router.post("/reservation", authenticateToken, reserveBook);

module.exports = router;
