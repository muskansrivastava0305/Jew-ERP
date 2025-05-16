const Category = require("../models/categoryModel")

// Add New Category
exports.addCategory = async (req, res) => {
  try {
    const { name, type, active } = req.body
    const newCategory = new Category({ name, type, active })
    await newCategory.save()
    res.status(201).json({ message: "Category added successfully", category: newCategory })
  } catch (error) {
    res.status(500).json({ message: "Failed to add category", error: error.message })
  }
}

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message })
  }
}
