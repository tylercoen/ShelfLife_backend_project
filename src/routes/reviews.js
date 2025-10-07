const express = require("express");
const router = express.Router();
const { addReview, deleteReview } = require("../controllers/reviewController");
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authMiddleware");
const { READUNCOMMITTED } = require("sequelize/lib/table-hints");

// POST /books/:id/reviews -> Add review
router.post("/books/:id/reviews", authenticateToken, addReview);

// GET /books/:id/reviews -> Fetch all reviews for a specific book
router.get(
  "/books/:id/reviews",
  authenticateToken,
  reviewController.getReviewsByBook
);

// DELETE /reviews/:id
router.delete("/reviews/:id", authenticateToken, deleteReview);

module.exports = router;
