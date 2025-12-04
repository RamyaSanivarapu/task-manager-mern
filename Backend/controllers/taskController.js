const Task = require("../models/Task");

// ---------------------- GET TASKS ----------------------

exports.getAdminTasks = async (req, res) => {
  try {
    // Return ONLY the admin's own tasks
    const tasks = await Task.find({ user: req.user.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching admin's tasks:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // TEAM TASKS
      tasks = await Task.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    } else {
      // NORMAL USER TASKS
      tasks = await Task.find({ user: req.user.id })
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: err.message });
  }
};



// ---------------------- CREATE TASK ----------------------
exports.createTask = async (req, res) => {
  try {
    const assignedUser = req.user.role === "admin"
      ? req.body.user   // from dropdown
      : req.user.id;     // normal user creates their own task

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: assignedUser
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// ---------------------- UPDATE TASK ----------------------
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ error: "Task not found" });

    // If normal user → can update only own task
    if (req.user.role !== "admin" && task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------- DELETE TASK ----------------------
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ error: "Task not found" });

    // Only Admin can delete ANY task
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Only admin can delete tasks" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
