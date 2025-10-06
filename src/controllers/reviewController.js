const { Review, Book, User } = require("../models");
const review = require("../models/review");

const addReview = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const bookId = req.params.id;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = await Review.create({
      content,
      rating,
      userId: req.user.id,
      bookId,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /books/:id/reviews
const getReviewsByBook = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`Fetching reviews for book ID: ${id}`);

    const reviews = await Review.findAll({
      where: { bookId: id },
      include: [{ model: User, attributes: ["id", "username", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addReview, getReviewsByBook };
