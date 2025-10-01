const express = require("express");
const router = express.Router();
const {
  addBook,
  listBooks,
  getBookById,
} = require("../controllers/bookController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /books -> Add book
router.post("/", authMiddleware, addBook);

// GET /books -> List books
router.get("/", authMiddleware, listBooks);

// GET /books/:id -> Get book details
router.get("/:id", authMiddleware, getBookById);

module.exports = router;
