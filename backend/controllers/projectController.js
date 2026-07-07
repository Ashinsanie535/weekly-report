const Project = require("../models/Project");

// @desc    Create a new project (Manager Only)
// @route   POST /api/projects
// @access  Private (Manager/Admin)
const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const projectExists = await Project.findOne({ name });
    if (projectExists) {
      return res.status(400).json({ message: "Project already exists" });
    }

    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects (Accessible by everyone logged in)
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects };