const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      priority,
      dueDate,
      user: req.user   // 🔥 from JWT middleware
    });

    res.status(201).json(task);   //201:something new successfully created.

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET USER TASKS
exports.getTasks = async (req, res) => {
  try {
    const { search, status, sort } = req.query;

    let query = { user: req.user };

    // 🔍 SEARCH
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 📊 FILTER
    if (status === "completed") {
      query.completed = true;
    } else if (status === "pending") {
      query.completed = false;
    }

    let tasksQuery = Task.find(query);

    // 🔄 SORT
    if (sort === "dueDate") {
      tasksQuery = tasksQuery.sort({ dueDate: 1 });
    } else if (sort === "priority") {
      tasksQuery = tasksQuery.sort({ priority: 1 });
    }

    const tasks = await tasksQuery;

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 check ownership
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // update fields
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 ownership check
    if (task.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET TASK STATS
exports.getTaskStats = async (req, res) => {
  try {
    const total = await Task.countDocuments({ user: req.user });

    const completed = await Task.countDocuments({
      user: req.user,
      completed: true
    });

    const pending = await Task.countDocuments({
      user: req.user,
      completed: false
    });

    res.json({
      total,
      completed,
      pending
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};