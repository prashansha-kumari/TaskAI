const cron = require("node-cron");
const Task = require("../models/Task");

// Run every minute
cron.schedule("* * * * *", async () => {
  console.log("Running reminder job...");

  try {
    const now = new Date();

    const tasks = await Task.find({
      dueDate: { $lte: now },
      completed: false
    });

    tasks.forEach(task => {
      console.log(`Reminder: Task "${task.title}" is due!`);
    });

  } catch (error) {
    console.log("Cron error:", error.message);
  }
});