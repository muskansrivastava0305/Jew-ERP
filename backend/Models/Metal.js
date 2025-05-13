const mongoose = require("mongoose")

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
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Metal", MetalSchema)
