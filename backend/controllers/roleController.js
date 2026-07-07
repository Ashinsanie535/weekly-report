const Role = require("../models/Role");

// @desc    Get all roles
// @route   GET /api/roles
const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching roles: " + error.message });
    }
};

// @desc    Create a new role (Optional - for admin use)
// @route   POST /api/roles
const createRole = async (req, res) => {
    const { role_name } = req.body;

    if (!role_name) {
        return res.status(400).json({ message: "Please provide a role name" });
    }

    try {
        const roleExists = await Role.findOne({ role_name });
        if (roleExists) {
            return res.status(400).json({ message: "Role already exists" });
        }

        const role = await Role.create({ role_name });
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: "Error creating role: " + error.message });
    }
};

module.exports = { getRoles, createRole };