const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links this report to a specific User model
      required: true,
    },
    weekRange: {
      type: String, // Example: "2026-07-06 to 2026-07-12"
      required: true,
    },
    project: {
      type: String, // Example: "Client A", "Internal Tooling"
      required: true,
    },
    tasksCompleted: {
      type: String,
      required: true,
    },
    tasksPlanned: {
      type: String,
      required: true,
    },
    blockers: {
      type: String,
      required: true,
    },
    hoursWorked: {
      type: Number, // Optional field
    },
    notes: {
      type: String, // Optional field
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "late"],
      default: "submitted",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Report", reportSchema);