const express = require("express");
const router = express.Router();
const {
  addReview,
  deleteReview,
  getReviewsByBook,
  updateReview,
} = require("../controllers/reviewController");
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authMiddleware");
const { READUNCOMMITTED } = require("sequelize/lib/table-hints");
const authMiddleware = require("../middleware/authMiddleware");

// POST /books/:id/reviews -> Add review
router.post("/", authMiddleware, addReview);

// GET /books/:id/reviews -> Fetch all reviews for a specific book
router.get("/:bookId", authMiddleware, reviewController.getReviewsByBook);

router.put("/:id", authMiddleware, updateReview);

// DELETE /reviews/:id
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
