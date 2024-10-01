const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// Middleware
app.use(express.json());
app.use(cors());
// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
