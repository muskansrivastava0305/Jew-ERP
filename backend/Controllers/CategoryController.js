const { getCategory } = require("../DatabaseFunction/Category/getCategory");
const { postCategory } = require("../DatabaseFunction/Category/postCategory");
const {
  updateCategory,
} = require("../DatabaseFunction/Category/updateCategory");

// Add New Category
exports.addCategory = async (req, res) => {
  try {
    const { url, nameOfCategory, jewelleeryType } = req.body;
    const result = await postCategory(url, nameOfCategory, jewelleeryType);
    if (result) {
      this.getAllCategory(req, res);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add category", error: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    let allMetals = await getCategory();

    res.status(200).json(allMetals);
  } catch (error) {
    console.error("Error fetching metals:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch metals", error: error.message });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { url, nameOfCategory, jewelleeryType } = req.body;

    const result = await updateCategory(
      categoryId,
      url,
      nameOfCategory,
      jewelleeryType
    );

    if (result) {
      this.getAllCategory(req, res); // Return updated list
    } else {
      res.status(404).json({ message: "Category not found or update failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update category", error: error.message });
  }
};
