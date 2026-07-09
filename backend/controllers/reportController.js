const Report = require("../models/Report");

// @desc    Create a new weekly report
const createReport = async (req, res) => {
    const { weekRange, project, tasksCompleted, tasksPlanned, blockers, hoursWorked, notes, status } = req.body;
    try {
        if (!weekRange || !project || !tasksCompleted || !tasksPlanned || !blockers) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }
        const report = await Report.create({
            user: req.user._id,
            weekRange,
            project,
            tasksCompleted,
            tasksPlanned,
            blockers,
            hoursWorked,
            notes,
            status: status || "submitted"
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged-in user's personal report history
const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user._id })
            .populate("project", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single report by ID
const getReportById = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an existing weekly report
const updateReport = async (req, res) => {
    try {
        let report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });

        if (report.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "User not authorized" });
        }

        report = await Report.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reports (Manager View) - Fixed Version
const getAllReports = async (req, res) => {
    try {
        const { teamMember, project, weekRange, status } = req.query;
        let query = {};
        if (teamMember) query.user = teamMember;
        if (project) query.project = project;
        if (weekRange) query.weekRange = weekRange;
        if (status) query.status = status;

        // දෝෂ මගහරවා ගැනීමට ඉඩ ලබා දෙමින් දත්ත ලබා ගැනීම
        const reports = await Report.find(query)
            .populate("user", "name email role")
            .populate("project", "name")
            .sort({ createdAt: -1 });
        
        // දත්ත ලැබුණත් නැතත් හිස් අරේ එකක් හෝ දත්ත යවන්න
        res.status(200).json(reports || []);
    } catch (error) {
        // මෙය Terminal එකේ පෙන්වයි
        console.error("DEBUG ERROR IN getAllReports:", error.message); 
        res.status(500).json({ message: "Error fetching reports", error: error.message });
    }
};

module.exports = {
    createReport,
    getMyReports,
    updateReport,
    getAllReports,
    getReportById
};