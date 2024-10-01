const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["Incomplete", "Complete"],
    default: "Incomplete",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
