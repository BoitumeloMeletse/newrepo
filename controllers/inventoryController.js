const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

exports.getInventoryItem = async (req, res, next) => {
  try {
    const inventoryId = req.params.id
    const vehicle = await inventoryModel.getVehicleById(inventoryId)
    if (!vehicle) {
      const error = new Error("Vehicle not found")
      error.status = 404
      return next(error)
    }
    const vehicleHtml = utilities.buildVehicleHtml(vehicle)
    res.render("inventory/detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHtml,
    })
  } catch (err) {
    next(err)
  }
}