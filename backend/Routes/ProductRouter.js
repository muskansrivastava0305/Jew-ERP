// const ensureAuthenticated = require("../Middlewares/Auth");

// const router = require("express").Router();

// router.post('/' , ensureAuthenticated ,(req, res) => {
//     console.log("------ logged in user detail------" , req.user);
//     res.status(200)
//     .json([
//         {
//             name : "Product 1",
//             price : 100,
//         },
//     ]);
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const productCtrl = require("../Controllers/ProductController");



// Product routes
router.get("/products", productCtrl.getAllProducts);
router.post("/products", productCtrl.createProduct);
router.put("/products/:id", productCtrl.updateProduct);
router.delete("/products/:id", productCtrl.deleteProduct);

module.exports = router;
