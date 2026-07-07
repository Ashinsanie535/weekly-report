const express = require("express");
const { 
    createReport, 
    getMyReports, 
    updateReport, 
    getAllReports 
} = require("../controllers/reportController");
const { protect, authorizeManager } = require("../middleware/authMiddleware");
const router = express.Router();

// Route for standard actions (Creating a report)
router.route("/").post(protect, createReport);

// Route for Team Members to see their personal history
router.get("/my-reports", protect, getMyReports);

// Route for Team Members to update an existing report
router.put("/:id", protect, updateReport);

// Route for Managers to view the dashboard with filters
router.get("/dashboard", protect, authorizeManager, getAllReports);

module.exports = router;