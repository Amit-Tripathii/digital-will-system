const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assetName: {
      type: String,
      required: true,
    },

    platform: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Asset", assetSchema);
