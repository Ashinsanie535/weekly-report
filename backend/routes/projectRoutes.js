const express = require("express");
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  updateProject, 
  deleteProject 
} = require("../controllers/projectController");
const { protect, authorizeManager } = require("../middleware/authMiddleware");

// සාමාන්‍ය routes (Create & Read)
router.route("/")
  .post(protect, authorizeManager, createProject) // Manager ට පමණක් නිර්මාණය කළ හැක
  .get(protect, getProjects); // ලොග් වූ සියලු දෙනාටම බැලිය හැක

// සංස්කරණය සහ මකාදැමීම සඳහා අලුත් routes (Update & Delete)
router.route("/:id")
  .put(protect, authorizeManager, updateProject) // Manager ට පමණක් සංස්කරණය කළ හැක
  .delete(protect, authorizeManager, deleteProject); // Manager ට පමණක් මකාදැමිය හැක

module.exports = router;