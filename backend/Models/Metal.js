const mongoose = require("mongoose");

const MetalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    trend: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    icon: {
      type: String,
      default: null,
    },
    unit: {
      type: String,
      required: false,
    },
    standardPurity: {
      type: String,
      required: false,
    },
    standardPurityPrice: {
      type: Number,
      required: false,
    },
    addVariants: [
      {
        variantName: {
          type: String,
          required: false,
        },
        purity: {
          type: String,
          required: false,
        },
        price: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Metal", MetalSchema);
