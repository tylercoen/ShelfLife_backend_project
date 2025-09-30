const express = require("express");
const router = express.Router();
const { User } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "createdAt", "updatedAt"], // exclude password
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
