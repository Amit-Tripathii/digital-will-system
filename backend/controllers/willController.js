const Will = require("../models/Will");

const sanitizeArray = (value) => (Array.isArray(value) ? value : []);

const normalizePayload = (body = {}) => ({
  title: body.title?.trim(),
  status: body.status,
  executor: body.executor || {},
  beneficiaries: sanitizeArray(body.beneficiaries),
  assets: sanitizeArray(body.assets),
  guardianshipNotes: body.guardianshipNotes,
  finalWishes: body.finalWishes,
  witnesses: sanitizeArray(body.witnesses),
  lastReviewedAt: body.lastReviewedAt || null,
});

exports.createWill = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: "Will title is required" });
    }

    const will = await Will.create({
      ...payload,
      owner: req.user._id,
    });

    res.status(201).json(will);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWills = async (req, res) => {
  try {
    const wills = await Will.find({ owner: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(wills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWillById = async (req, res) => {
  try {
    const will = await Will.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!will) {
      return res.status(404).json({ message: "Will not found" });
    }

    res.json(will);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWill = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: "Will title is required" });
    }

    const will = await Will.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      payload,
      { new: true, runValidators: true },
    );

    if (!will) {
      return res.status(404).json({ message: "Will not found" });
    }

    res.json(will);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWill = async (req, res) => {
  try {
    const will = await Will.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!will) {
      return res.status(404).json({ message: "Will not found" });
    }

    res.json({ message: "Will deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
