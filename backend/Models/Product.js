const mongoose = require('mongoose');

const metalSchema = new mongoose.Schema({
  metal: String,
  variant: String,
  weight: Number,
});

const stoneSchema = new mongoose.Schema({
  stone: String,
  quantity: Number,
  weight: Number,
  price: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  weight: Number,
  type: String,
  gender: String,
  category: String,
  image: String,
  metals: [metalSchema],
  stones: [stoneSchema],
  huidNumber: String,
  hsnNumber: String,
  makingCharges: Number,
  active: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
