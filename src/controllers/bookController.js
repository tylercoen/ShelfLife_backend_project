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
    //res.json(books);
    res.status(200).json({ books });
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

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.update(updatedData);
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addBook, listBooks, getBookById, updateBook, deleteBook };
