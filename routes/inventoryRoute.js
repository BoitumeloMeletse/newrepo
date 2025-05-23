const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

// Route to get a specific inventory item by ID
router.get("/detail/:id", inventoryController.getInventoryItem)

module.exports = router