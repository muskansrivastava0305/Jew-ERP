const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

// Update an existing category by ID
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category', error });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error });
  }
};
