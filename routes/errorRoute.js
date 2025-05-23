const express = require("express")
const router = new express.Router()
const errorController = require("../controllers/errorController")

// Route to trigger intentional error
router.get("/trigger-error", errorController.triggerError)

module.exports = router
