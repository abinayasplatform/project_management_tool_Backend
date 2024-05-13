const Task = require("../models/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const {
      taskName,
      description,
      assignedTo,
      assignedBy,
      createTime,
      deadline,
      taskStatus,
      project,
    } = req.body;
    const newTask = new Task({
      taskName,
      description,
      assignedTo,
      assignedBy,
      createTime,
      deadline,
      taskStatus,
      project,
    });
    await newTask.save();
    res.status(200).json({
      msg: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      msg: "Error creating task",
      data: null,
    });
  }
};

// Read a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    console.log(task);
    res.status(200).json({
      msg: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({
      msg: "Error fetching task by ID",
      data: null,
    });
  }
};
exports.getallTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.find({ assignedBy: id });
    console.log(task);
    res.status(200).json({
      msg: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({
      msg: "Error fetching task by ID",
      data: null,
    });
  }
};
// update task by id
exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { taskName, description, taskStatus } = req.body;
  try {
    let tasks = await Task.findById(taskId);

    if (!tasks) {
      return res.status(404).json({
        msg: "Task not found",
        data: null,
      });
    }

    if (taskName) tasks.taskName = taskName;
    if (description) tasks.description = description;
    if (taskStatus) tasks.taskStatus = taskStatus;

    await tasks.save();

    res.status(200).json({
      msg: "Successfully updated",
      data: tasks,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      msg: "Server Error",
      data: null,
    });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).json({
      msg: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      msg: "Error deleting task",
      data: null,
    });
  }
};
