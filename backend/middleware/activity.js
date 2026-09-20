const User = require("../models/User");

const activity = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      lastActive: new Date(),
    });

    next();
  } catch (error) {
    console.log("Activity update error:", error);

    next();
  }
};

module.exports = activity;
