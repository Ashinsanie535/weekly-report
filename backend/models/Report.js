const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekRange: {
      type: String,
      required: true,
    },
    // project field එක String වෙනුවට ObjectId ලෙස වෙනස් කරන්න
    project: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", // මෙය ඔබගේ Project model එකේ නම විය යුතුයි
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
      type: Number,
      default: 0, // 0 ලෙස සැකසීම වඩාත් සුදුසුයි
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "submitted", "late"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);