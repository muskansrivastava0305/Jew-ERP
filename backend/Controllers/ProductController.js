const Product = require('../Models/Product');

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      weight,
      type,
      gender,
      category,
      metals,
      stones,
      huidNumber,
      hsnNumber,
      makingCharges,
      active
    } = req.body;

    const parsedMetals = metals ? JSON.parse(metals) : [];
    const parsedStones = stones ? JSON.parse(stones) : [];

    const product = new Product({
      name,
      description,
      price,
      stock,
      weight,
      type,
      gender,
      category,
      image: req.file?.path || "",
      metals: parsedMetals,
      stones: parsedStones,
      huidNumber,
      hsnNumber,
      makingCharges,
      active
    });

    await product.save();
    res.status(201).json({ success: true, message: "Product created", product });
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};








// const Product = require("../Models/Product");

// exports.getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// };

// exports.createProduct = async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// };

// exports.updateProduct = async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// };

// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Product deleted" });
// };
