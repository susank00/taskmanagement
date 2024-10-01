const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./model/task");
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

// GET endpoint to fetch tasks

// POST endpoint to create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task
    const newTask = new Task({ title, description });
    await newTask.save(); // Save the task to the database

    res.status(201).json(newTask); // Respond with the created task
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});

// GET request to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks); // Respond with the list of tasks
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
});
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated task
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
