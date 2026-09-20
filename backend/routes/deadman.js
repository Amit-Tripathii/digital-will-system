const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/status", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const daysInactive = Math.floor(
      (Date.now() - user.lastActive.getTime()) / (1000 * 60 * 60 * 24),
    );

    let status = "Active";

    if (daysInactive >= 60) {
      status = "Triggered";
    } else if (daysInactive >= 30) {
      status = "Warning";
    }

    res.status(200).json({
      lastActive: user.lastActive,
      daysInactive,
      status,
      isTriggered: user.isTriggered,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/activate", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.lastActive = new Date();
    user.isTriggered = false;

    await user.save();

    res.status(200).json({
      message: "Activity updated successfully",
      lastActive: user.lastActive,
      daysInactive: 0,
      status: "Active",
      isTriggered: user.isTriggered,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
module.exports = router;
