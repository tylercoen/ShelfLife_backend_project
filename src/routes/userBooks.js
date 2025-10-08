const express = require("express");
const router = express.Router();
const {
  addUserBook,
  updateUserBook,
  deleteUserBook,
  getUserBooks,
} = require("../controllers/userBookController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addUserBook);
router.put("/:id", authMiddleware, updateUserBook);
router.get("/", authMiddleware, getUserBooks);
router.delete("/:id", authMiddleware, deleteUserBook);

module.exports = router;
