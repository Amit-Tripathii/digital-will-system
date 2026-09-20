const express = require("express");
const Asset = require("../models/Asset");
const auth = require("../middleware/auth");
const activity = require("../middleware/activity");
const { encrypt, decrypt } = require("../utils/encryption");
const router = express.Router();

router.post("/", auth, activity, async (req, res) => {
  try {
    const { assetName, platform, username, password, notes } = req.body;

    const asset = await Asset.create({
      userId: req.user.id,
      assetName,
      platform,
      username,

      encryptedPassword: encrypt(password),

      notes,
    });

    res.status(201).json(asset);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.get("/", auth, activity, async (req, res) => {
  try {
    const assets = await Asset.find({
      userId: req.user.id,
    });

    res.status(200).json(assets);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id/password", auth, activity, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    if (asset.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const password = decrypt(asset.encryptedPassword);

    res.status(200).json({
      password,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.put("/:id", auth, activity, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    if (asset.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { assetName, platform, username, password, notes } = req.body;

    asset.assetName = assetName;
    asset.platform = platform;
    asset.username = username;
    asset.notes = notes;

    // Only update password if a new password was provided
    if (password && password.trim() !== "") {
      asset.encryptedPassword = encrypt(password);
    }

    const updatedAsset = await asset.save();

    res.status(200).json(updatedAsset);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete("/:id", auth, activity, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        message: "Asset not found",
      });
    }

    if (asset.userId.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await Asset.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Asset Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
