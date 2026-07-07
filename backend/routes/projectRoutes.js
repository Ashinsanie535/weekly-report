const express = require("express");
const { createProject, getProjects } = require("../controllers/projectController");
const { protect, authorizeManager } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .post(protect, authorizeManager, createProject) // Only managers can create projects
  .get(protect, getProjects); // All logged-in users can view projects for dropdowns

module.exports = router;