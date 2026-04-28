import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ setPage }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // ✅ NEW STATES (YOU MISSED THESE)
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  // notes
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [content, setContent] = useState("");

  // AI
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const token = localStorage.getItem("token");

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    await axios.post(
      "http://localhost:5000/api/tasks",
      { title, priority, dueDate },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setPriority("low");
    setDueDate("");

    fetchTasks();
    fetchStats();
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${task._id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTasks();
    fetchStats();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
    fetchStats();
  };

  // NOTES
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!noteTitle || !content) return;

    await axios.post(
      "http://localhost:5000/api/notes",
      { title: noteTitle, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNoteTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  // AI
  const askAI = async () => {
    if (!question) return;

    const res = await axios.post(
      "http://localhost:5000/api/ai/ask",
      { question },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setAnswer(res.data.answer);
  };

  // STATS
  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchNotes();
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

 return (
  <div className="min-h-screen p-6 
  bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-purple-300">
        TaskAI
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow"
      >
        Logout
      </button>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      {[stats.total, stats.completed, stats.pending].map((val, i) => (
        <div
          key={i}
          className="p-4 rounded-xl text-center 
          bg-white/5 backdrop-blur-lg border border-white/10 
          shadow-[0_0_20px_rgba(128,0,255,0.2)]"
        >
          <p className="text-lg font-semibold">
            {i === 0 ? "Total" : i === 1 ? "Completed" : "Pending"}
          </p>
          <p className="text-2xl font-bold text-purple-300">{val}</p>
        </div>
      ))}
    </div>

    {/* TASK SECTION */}
    <div className="p-6 rounded-xl mb-8 
    bg-white/5 backdrop-blur-lg border border-white/10 
    shadow-[0_0_25px_rgba(128,0,255,0.2)]">

      <h2 className="text-xl font-bold mb-4 text-purple-300">Tasks</h2>

      <div className="flex flex-wrap gap-2 mb-4">

        <input
          type="text"
          placeholder="Enter task..."
          className="p-2 flex-1 min-w-[200px] rounded 
          bg-transparent border border-white/20 text-white 
          focus:ring-2 focus:ring-purple-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded bg-transparent border border-white/20"
        >
          <option value="low" className="text-black">Low</option>
          <option value="medium" className="text-black">Medium</option>
          <option value="high" className="text-black">High</option>
        </select>

        <input
          type="date"
          className="p-2 rounded bg-transparent border border-white/20"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button
          onClick={addTask}
          className="px-4 rounded 
          bg-gradient-to-r from-purple-500 to-indigo-500 
          shadow-[0_0_15px_rgba(128,0,255,0.5)]"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
  key={task._id}
  className={`flex justify-between items-center p-3 rounded border border-white/10 transition
  ${
    task.priority === "high"
      ? "bg-white/15 border-l-4 border-purple-400"
      : task.priority === "medium"
      ? "bg-white/10 border-l-4 border-purple-300"
      : "bg-white/5 border-l-4 border-purple-200"
  }`}
>
            <span
              onClick={() => toggleComplete(task)}
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
              <br />
              <small className="text-gray-400">
                {task.priority} |{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : ""}
              </small>
            </span>

            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* NOTES */}
    <div className="p-6 rounded-xl mb-8 
    bg-white/5 backdrop-blur-lg border border-white/10">

      <h2 className="text-xl font-bold mb-4 text-purple-300">Notes</h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          placeholder="Title"
          className="p-2 rounded bg-transparent border border-white/20"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <textarea
          placeholder="Content..."
          className="p-2 rounded bg-transparent border border-white/20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={addNote}
          className="py-2 rounded bg-green-500 hover:bg-green-600"
        >
          Add Note
        </button>
      </div>

      {notes.map((note) => (
        <div
          key={note._id}
          className="p-3 mb-2 rounded bg-white/5 flex justify-between"
        >
          <div>
            <h3>{note.title}</h3>
            <p className="text-gray-400 text-sm">{note.content}</p>
          </div>

          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-400"
          >
            Delete
          </button>
        </div>
      ))}
    </div>

    {/* AI */}
    <div className="p-6 rounded-xl 
    bg-white/5 backdrop-blur-lg border border-white/10">

      <h2 className="text-xl font-bold mb-4 text-purple-300">
        AI Assistant 🤖
      </h2>

      <div className="flex flex-col gap-2">
        <input
          placeholder="Ask something..."
          className="p-2 rounded bg-transparent border border-white/20"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askAI}
          className="py-2 rounded bg-purple-500 hover:bg-purple-600"
        >
          Ask AI
        </button>

        {answer && (
          <div className="p-3 rounded bg-white/10 mt-2">
            {answer}
          </div>
        )}
      </div>
    </div>

  </div>
);
}

export default Dashboard;