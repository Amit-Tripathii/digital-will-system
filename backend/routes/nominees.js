const express = require("express");
const Nominee = require("../models/Nominee");
const auth = require("../middleware/auth");
const activity = require("../middleware/activity");
const router = express.Router();

router.post("/", auth, activity, async (req, res) => {
  try {
    const { nomineeName, nomineeEmail, relationship, phone } = req.body;

    const nominee = await Nominee.create({
      userId: req.user.id,
      nomineeName,
      nomineeEmail,
      relationship,
      phone,
    });

    res.status(201).json(nominee);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/", auth, activity, async (req, res) => {
  try {
    const nominees = await Nominee.find({
      userId: req.user.id,
    });

    res.status(200).json(nominees);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.put("/:id", auth, activity, async (req, res) => {
  try {
    const nominee = await Nominee.findById(req.params.id);

    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    if (nominee.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const updatedNominee = await Nominee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.status(200).json(updatedNominee);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete("/:id", auth, activity, async (req, res) => {
  try {
    const nominee = await Nominee.findById(req.params.id);

    if (!nominee) {
      return res.status(404).json({
        message: "Nominee not found",
      });
    }

    if (nominee.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await Nominee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Nominee Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
