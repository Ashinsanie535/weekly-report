const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["team_member", "manager"],
      default: "team_member", // By default, registration is as a Team Member
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);