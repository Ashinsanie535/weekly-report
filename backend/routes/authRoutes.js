const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/authController"); // getAllUsers එකතු කරන්න
const { protect } = require("../middleware/authMiddleware"); // protect middleware එක අවශ්‍යයි
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// සියලුම පරිශීලකයින් ලබා ගැනීමේ route එක
router.get("/users", protect, getAllUsers); 

module.exports = router;