const mongoose = require("mongoose");

const nomineeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    nomineeName: {
      type: String,
      required: true,
    },

    nomineeEmail: {
      type: String,
      required: true,
    },

    relationship: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Nominee", nomineeSchema);
