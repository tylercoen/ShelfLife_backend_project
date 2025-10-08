const { UserBook, Book } = require("../models");

const addUserBook = async (req, res) => {
  try {
    const { bookId, status } = req.body;

    const userBook = await UserBook.create({
      userId: req.user.id,
      bookId,
      status: status || "to-read",
    });

    res.status(201).json({
      message: "Book added to reading list",
      userBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rating } = req.body;

    // Find the UserBook entry, ensure it belongs to logged-in user
    const userBook = await UserBook.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!userBook) {
      return res.status(404).json({ message: "UserBook entry not found" });
    }

    // Update fields if provided
    if (status) userBook.status = status;
    if (rating !== undefined) userBook.rating = rating;

    await userBook.save();

    res.json({
      message: "UserBook updated successfully",
      userBook,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserBooks = async (req, res) => {
  try {
    const userBooks = await UserBook.findAll({
      where: { userId: req.user.id },
      include: [{ model: Book }],
    });
    res.status(200).json({ userBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserBook = async (req, res) => {
  try {
    const userBookId = req.params.id;

    const userBook = await UserBook.findOne({
      where: {
        id: userBookId,
        userId: req.user.id,
      },
    });

    if (!userBook) {
      return res.status(404).json({ message: "Book not found in your list" });
    }

    await userBook.destroy();

    res.json({ message: "Book removed from your list" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sever error" });
  }
};

module.exports = { addUserBook, updateUserBook, getUserBooks, deleteUserBook };
