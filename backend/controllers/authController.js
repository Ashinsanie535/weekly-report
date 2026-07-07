const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (req, res) => {
  // Frontend එකෙන් එන 'role' යතුර (key) මෙතනට ගන්න
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // role එක පාවිච්චි කර අදාළ Role එකේ ObjectId එක සොයාගැනීම
    const roleDoc = await Role.findOne({ role_name: role || "team_member" });
    if (!roleDoc) return res.status(400).json({ message: "Invalid role provided" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: roleDoc._id,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: roleDoc.role_name,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // .populate("role") මගින් role දත්ත ලබාගැනීම
    const user = await User.findOne({ email }).populate("role");

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role.role_name, // දැන් මෙතන දෝෂයක් එන්නේ නැහැ
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };