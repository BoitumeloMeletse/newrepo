// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification
router.get("/type/:classificationId", (invController.buildByClassificationId))

// Route to deliver inventory item details
router.get("/detail/:invId", (invController.buildByInventoryId))

// Route for intentional error (Task 3)
//router.get("/error", (invController.triggerError))




module.exports = router