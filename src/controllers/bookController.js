const { Book } = require("../models");

const addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are requred" });
    }

    const book = await Book.create({
      title,
      author,
      description,
    });

    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        "id",
        "title",
        "author",
        "isbn",
        "genre",
        "publishedYear",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, listBooks, getBookById };
