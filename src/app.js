const express = require("express");
const app = express();

//Middleware
app.use(express.json());

//Basic route
app.get("/", (req, res) => {
  res.send("Welcome to ShelfLife API!");
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userRoutes = (required = require("./routes/users"));
app.use("/users", userRoutes);

const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

const userBookRoutes = require("./routes/userBooks");
app.use("/user-books", userBookRoutes);

const reviewRoutes = require("./routes/reviews");
app.use("/", reviewRoutes);
//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
