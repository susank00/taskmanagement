import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState(""); // New state for title
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editTitle, setEditTitle] = useState(""); // New state for editing title

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:3001/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (taskDescription.trim() === "" || taskTitle.trim() === "") return; // Ensure title is not empty

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: "Incomplete",
    };

    const response = await axios.post("http://localhost:3001/tasks", newTask);
    setTasks([...tasks, response.data]); // Update tasks with the newly created task
    setTaskTitle(""); // Reset title input
    setTaskDescription(""); // Reset description input
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task status
  const toggleStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === id) {
        return {
          ...task,
          status: task.status === "Incomplete" ? "Complete" : "Incomplete",
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save edited task
  const saveEdit = async (id) => {
    const updatedTask = { title: editTitle, description: editDescription };
    const response = await axios.put(
      `http://localhost:3001/tasks/${id}`,
      updatedTask
    );
    const updatedTasks = tasks.map((task) =>
      task._id === id ? response.data : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditDescription("");
    setEditTitle(""); // Reset title when done editing
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-800 animate-gradient place-content-center">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8">
        Task Management Dashboard
      </h1>

      {/* Task Form */}
      <form
        onSubmit={addTask}
        className="flex justify-center items-center flex-col ml-84 bg-white p-6 shadow-lg rounded-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter task title" // Title input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="flex flex-col items-center mt-8 w-full">
        {tasks.length === 0 ? (
          <p className="text-white text-xl font-semibold">
            No tasks available. Add a task to get started!
          </p>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-blue-600 text-white text-left font-bold text-xl">
                  Title {/* Added Title column */}
                </th>
                <th className="py-4 px-6 bg-blue-600 text-white text-left font-bold text-xl">
                  Description
                </th>
                <th className="py-4 px-6 bg-blue-600 text-white text-left font-bold text-xl">
                  Status
                </th>
                <th className="py-4 px-6 bg-blue-600 text-white text-left font-bold text-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b">
                  <td className="py-4 px-6 text-lg">
                    {editTaskId === task._id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="p-2 w-full border rounded-lg"
                      />
                    ) : (
                      task.title
                    )}
                  </td>
                  <td className="py-4 px-6 text-lg">
                    {editTaskId === task._id ? (
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="p-2 w-full border rounded-lg"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-lg font-semibold ${
                        task.status === "Complete"
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {editTaskId === task._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task._id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTaskId(null)}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleStatus(task._id)}
                          className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => startEdit(task)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ml-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ml-2"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
