const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  weight: Number,
  stock: Number,
  active: { type: Boolean, default: true },
  type: String,
  materials: {
    metal: String,
    stone: String,
    bronze: String,
    pearl: String,
    bronzeCode: String,
  },
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);
