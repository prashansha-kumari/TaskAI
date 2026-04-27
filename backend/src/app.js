const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/testProtected");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/ai", aiRoutes);


module.exports = app;