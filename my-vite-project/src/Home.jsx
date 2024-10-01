import { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (taskDescription.trim() === "") return;

    const newTask = {
      id: Date.now(),
      description: taskDescription,
      status: "Incomplete",
    };

    setTasks([...tasks, newTask]);
    setTaskDescription("");
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task status
  const toggleStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
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
  const startEdit = (id, currentDescription) => {
    setEditTaskId(id);
    setEditDescription(currentDescription);
  };

  // Save edited task
  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: editDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditTaskId(null);
    setEditDescription("");
  };

  return (
    // <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-300 via-green-400 to-green-600 min-h-screen">
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
                <tr key={task.id} className="border-b">
                  <td className="py-4 px-6 text-lg">
                    {editTaskId === task.id ? (
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
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 space-x-2">
                    {editTaskId === task.id ? (
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(task.id, task.description)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleStatus(task.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      {task.status === "Complete"
                        ? "Mark Incomplete"
                        : "Mark Complete"}
                    </button>
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
