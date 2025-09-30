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

const userRouter = (required = require("./routes/users"));
app.use("/users", userRouter);

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
