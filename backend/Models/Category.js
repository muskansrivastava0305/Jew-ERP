const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Metal", "Artificial"],
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true })

module.exports = mongoose.model("Category", categorySchema)
