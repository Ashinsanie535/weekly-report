const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      
      req.user = await User.findById(decoded.id).select("-password").populate("role");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};


const authorizeManager = (req, res, next) => {
  
  if (req.user && req.user.role && req.user.role.role_name === "manager") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Managers only." });
  }
};

module.exports = { protect, authorizeManager };