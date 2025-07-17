const express = require("express");
const User = require("../models/User");
const checkAuth = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.patch("/pay", checkAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { feesPaid: true },
      { new: true }
    );

    // emit an event to notify other clients
    const io = req.app.get("io");
    io.emit("feesPaid", {
      userId: user._id,
      name: user.name,
      email: user.email,
    });
    res.json({ message: "Fees paid successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/profile/update", checkAuth, async (req, res) => {
  const { name, email } = req.body;
  try {
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });

    //broadcast profile update event
    const io = req.app.get("io");
    io.emit("profileUpdated", {
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
