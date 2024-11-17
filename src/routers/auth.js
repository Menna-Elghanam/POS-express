import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
// test route

router.get("/", (req, res) => {
  res.json({ message: "Test route" });
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Create new user
    user = new User({ username, email, password });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    console.log("tet", req.body);

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Protected Route (Dashboard)
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ message: `Welcome, ${user.username}` });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout Route (for token removal on client-side)
router.post("/logout", (req, res) => {
  // On the client, simply clear the token
  res.json({ message: "Logged out successfully" });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export default router;
