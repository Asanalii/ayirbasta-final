// app.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

// Import routes
const userRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");
const tradeRoutes = require("./routes/trades");

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const dbURI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI || "mongodb://localhost:27017/ayirbasta_test"
    : process.env.MONGO_URI;

// MongoDB connection
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Route setup
app.use("/v1/users", userRoutes);
app.use("/v1/items", itemRoutes);
app.use("/v1/trades", tradeRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Static files
app.use("/static", express.static(path.join(__dirname, "static")));

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = app;
