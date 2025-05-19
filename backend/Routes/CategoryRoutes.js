const express = require("express")
const router = express.Router()
const { addCategory, getAllCategories } = require("../Controllers/CategoryController")

router.post("/", addCategory)
router.get("/", getAllCategories)

// // Category routes
// router.get("/categories", categoryCtrl.getAllCategories);
// router.post("/categories", categoryCtrl.createCategory);
// router.put("/categories/:id", categoryCtrl.updateCategory);
// router.delete("/categories/:id", categoryCtrl.deleteCategory);

module.exports = router
