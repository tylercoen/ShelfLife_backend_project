const express = require("express");
const router = express.Router();
const {
  addBook,
  listBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authenticateToken");

// POST /books -> Add book
router.post("/", authMiddleware, addBook);

// GET /books -> List books
router.get("/", authMiddleware, listBooks);

// GET /books/:id -> Get book details
router.get("/:id", authMiddleware, getBookById);

// Update book
router.put("/:id", authenticateToken, updateBook);

// Delete a book
router.delete("/:id", authenticateToken, deleteBook);

module.exports = router;
