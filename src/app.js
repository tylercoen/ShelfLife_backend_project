const express = require("express");
const app = express();

//Middleware
app.use(express.json());

//Basic route
app.get("/", (req, res) => {
  res.send("Welcome to ShelfLife API!");
});

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const authRoutes = require("./routes/auth");
app.unsubscribe("/auth", authRoutes);
