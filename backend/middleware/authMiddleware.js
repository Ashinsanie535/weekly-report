const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Token එක ලබා ගැනීම
      token = req.headers.authorization.split(" ")[1];
      
      // Token එක සත්‍යාපනය කිරීම (Verify)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // User ව Database එකෙන් ලබා ගැනීම (password රහිතව සහ role එක populate කරමින්)
      req.user = await User.findById(decoded.id).select("-password").populate("role");
      
      if (!req.user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Manager සඳහා පමණක් අවසර දීම (Best Practice අනුව යාවත්කාලීන කළා)
const authorizeManager = (req, res, next) => {
  // Optional chaining (?.) භාවිතා කර ආරක්ෂාව තහවුරු කිරීම
  if (req.user?.role?.role_name === "manager") {
    next();
  } else {
    // 403 Forbidden: අයිතියක් නැති බව පෙන්වන්න
    res.status(403).json({ message: "Access denied. Managers only." });
  }
};

module.exports = { protect, authorizeManager };