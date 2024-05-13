const Project = require("../models/projectModel");
const authenticateToken = require("../middleware/authenticate");

// Function to create a new project
exports.createProject = async (req, res) => {
  try {
    // Function to create a new project
    const {
      title,
      description,
      category,
      deadline,
      task,
      teamLeader,
      members,
      projectStatus,
    } = req.body;
    // Create a new project instance
    const project = new Project({
      title,
      description,
      category,
      deadline,
      teamLeader,
      members,
      projectStatus,
    });
    // Save the project to the database
    await project.save();
    // Send a success response with the created project data
    res.status(200).json({
      msg: "Project created successfully",
      data: project,
    });
  } catch (error) {
    // Send an error response if project creation fails
    res.status(500).json({
      msg: "Error creating project",
      data: null,
    });
  }
};

// Function to update an existing project
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  const { title, description, projStatus } = req.body;
  try {
    // Find the project by ID
    let project = await Project.findById(projectId);
    // If project not found, send a 404 response
    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
        data: null,
      });
    }
    // Update project fields if provided
    if (title) project.title = title;
    if (description) project.description = description;
    if (projStatus) project.projStatus = projStatus;
    // Save the updated project
    await project.save();
    // Send a success response with the updated project data
    res.status(200).json({
      msg: "Successfully updated",
      data: project,
    });
  } catch (error) {
    // Send an error response if project update fails
    console.error("Error updating project:", error);
    res.status(500).json({
      msg: "Server Error",
      data: null,
    });
  }
};

// Function to get a project by its ID
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;
  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    // If project not found, send a 404 response
    if (!project) {
      return res.status(500).json({
        msg: "Project not found",
        data: null,
      });
    }
    // Send a success response with the project data
    res.status(200).json({
      msg: "ok",
      data: project,
    });
  } catch (error) {
    // Send an error response if fetching project fails
    console.error("Error fetching project:", error);
    res.status(500).json({
      msg: "Server Error",
      data: null,
    });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deleteProject = await Project.findByIdAndDelete(projectId);
    res.status(200).json({
      msg: "Project deleted successfully",
      data: deleteProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      msg: "Error deleting project",
      data: null,
    });
  }
};
