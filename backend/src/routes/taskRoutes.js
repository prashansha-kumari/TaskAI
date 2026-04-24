const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getTaskStats } = require("../controllers/taskController");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// existing
router.post("/", protect, createTask);
router.get("/", protect, getTasks);

// NEW
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/stats", protect, getTaskStats);

module.exports = router;