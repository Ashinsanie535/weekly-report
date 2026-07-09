const express = require("express");
const router = express.Router();
const { 
    createReport, 
    getMyReports, 
    updateReport, 
    getAllReports,
    getReportById // Edit සඳහා අවැසි වාර්තාව ලබා ගැනීමට මෙය එකතු කරගන්න
} = require("../controllers/reportController");
const { protect, authorizeManager } = require("../middleware/authMiddleware");

// 1. වාර්තා නිර්මාණය කිරීම සහ මූලික Route
router.route("/")
    .post(protect, createReport);

// 2. පරිශීලකයාගේ පෞද්ගලික වාර්තා ඉතිහාසය (My Reports)
router.get("/my-reports", protect, getMyReports);

// 3. මැනේජර් සඳහා Dashboard (සියලු වාර්තා බැලීම)
router.get("/dashboard", protect, authorizeManager, getAllReports);

// 4. Edit කිරීම සඳහා වාර්තාවක් ID එකෙන් ලබා ගැනීම
router.get("/:id", protect, getReportById);

// 5. වාර්තාවක් Update කිරීම
router.put("/:id", protect, updateReport);


module.exports = router;