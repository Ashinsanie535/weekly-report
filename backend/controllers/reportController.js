const Report = require("../models/Report");

// @desc    Create a new weekly report (Team Member)
// @route   POST /api/reports
// @access  Private (Team Member)
const createReport = async (req, res) => {
    const { 
        weekRange, 
        project, 
        tasksCompleted, 
        tasksPlanned, 
        blockers, 
        hoursWorked, 
        notes, 
        status 
    } = req.body;

    try {
        // Validation: Check for all required fields mandatory for a standard report
        if (!weekRange || !project || !tasksCompleted || !tasksPlanned || !blockers) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // Create the report associated with the currently authenticated user
        const report = await Report.create({
            user: req.user._id, // Injected by authentication middleware
            weekRange,
            project,
            tasksCompleted,
            tasksPlanned,
            blockers,
            hoursWorked,
            notes,
            status: status || "submitted" // Set default status if not explicitly provided
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged-in user's personal report history (Team Member)
// @route   GET /api/reports/my-reports
// @access  Private (Team Member)
const getMyReports = async (req, res) => {
    try {
        // Fetch only the reports belonging to the logged-in user, sorted by newest first
        const reports = await Report.find({ user: req.user._id })
            .populate("project")
            .sort({ createdAt: -1 }); 
        
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an existing weekly report (Team Member)
// @route   PUT /api/reports/:id
// @access  Private (Team Member)
const updateReport = async (req, res) => {
    try {
        let report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        // Authorization check: Ensure the user owns the report they are trying to update
        if (report.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // Proceed to update the report records
        report = await Report.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reports with filters for Team Dashboard (Manager View)
// @route   GET /api/reports/dashboard
// @access  Private (Manager/Admin)
const getAllReports = async (req, res) => {
    try {
        const { teamMember, project, weekRange, status } = req.query;
        let query = {};

        // Build dynamic query object based on manager-selected filters
        if (teamMember) query.user = teamMember;
        if (project) query.project = project;
        if (weekRange) query.weekRange = weekRange;
        if (status) query.status = status;

        // Fetch reports matching the criteria with populated user and project relations
        const reports = await Report.find(query)
            .populate("user", "name email role") 
            .populate("project")
            .sort({ createdAt: -1 });

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReport,
    getMyReports,
    updateReport,
    getAllReports
};