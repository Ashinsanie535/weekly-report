const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // උදා: "Client A", "Internal Tooling"
    },
    description: {
      type: String,
    },
    // සාමාජිකයින් පැවරීම සඳහා අලුතින් එකතු කරන ලදි
    teamMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // මෙය ඔබේ User Model එකට සම්බන්ධ වේ
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);