const { Review, Book, User } = require("../models");

const addReview = async (req, res) => {
  try {
    const { content, rating, bookId } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = await Review.create({
      content,
      rating,
      userId: req.user.id,
      bookId,
    });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /books/:id/reviews
const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.findAll({
      where: { bookId },
      include: [{ model: User, attributes: ["username", "email"] }],
      order: [["createdAt", "DESC"]],
    });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }
    res.status(200).json({ reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;

    const review = await Review.findOne({ where: { id, userId: req.user.id } });
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (content) review.content = content;
    if (rating !== undefined) review.rating = rating;

    await review.save();
    res.json({ message: "Review updated successfully", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addReview, getReviewsByBook, updateReview, deleteReview };
