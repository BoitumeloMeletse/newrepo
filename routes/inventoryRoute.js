// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to deliver inventory item details (Task 1)
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId))

// Route for intentional error (Task 3)
router.get("/error", utilities.handleErrors(invController.triggerError))

module.exports = router
