const Project = require("../models/Project");

// @desc    Create a new project (Manager Only)
const createProject = async (req, res) => {
  const { name, description, teamMembers } = req.body;
  try {
    if (!name) return res.status(400).json({ message: "Project name is required" });

    const projectExists = await Project.findOne({ name });
    if (projectExists) return res.status(400).json({ message: "Project already exists" });

    // teamMembers දත්ත ඇතුළත් කිරීම
    const project = await Project.create({ name, description, teamMembers });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
const getProjects = async (req, res) => {
  try {
    // .populate("teamMembers") මගින් ID එක වෙනුවට User ගේ විස්තර ලබා ගත හැක
    const projects = await Project.find({}).populate("teamMembers", "name email").sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
const updateProject = async (req, res) => {
  try {
    // teamMembers ඇතුළුව සියලු දත්ත යාවත්කාලීන කිරීම
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, description: req.body.description, teamMembers: req.body.teamMembers },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };