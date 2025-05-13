const express = require("express")
const router = express.Router()

// Import controllers
const MetalsController = require("../Controllers/MetalsController")
const DashboardController = require("../Controllers/DashboardController")
const CustomerController = require("../Controllers/customerController")
const UserController = require("../Controllers/UserController")

// Metals routes
router.get("/metals", MetalsController.getAllMetals)
router.get("/metals/:id", MetalsController.getMetalById)
router.post("/metals", MetalsController.createMetal)
router.put("/metals/:id", MetalsController.updateMetal)
router.put("/metals/:id/price", MetalsController.updateMetalPrice)
router.delete("/metals/:id", MetalsController.deleteMetal)

// Dashboard routes
router.get("/dashboard", DashboardController.getDashboardData)
router.get("/sales/graph", DashboardController.getSalesGraphData)
router.get("/analytics", DashboardController.getAnalyticsData)

// Customer routes
router.get("/customers", CustomerController.getAllCustomers)
router.get("/customers/recent", CustomerController.getRecentCustomers)
router.get("/customers/search", CustomerController.searchCustomers)
router.get("/customers/:id", CustomerController.getCustomerById)
router.post("/customers", CustomerController.createCustomer)
router.put("/customers/:id", CustomerController.updateCustomer)
router.delete("/customers/:id", CustomerController.deleteCustomer)

// User routes
router.get("/user/profile", UserController.getUserProfile)
router.put("/user/profile", UserController.updateUserProfile)
router.put("/user/change-password", UserController.changePassword)
router.post("/user/profile-picture", UserController.uploadProfilePicture)

module.exports = router
