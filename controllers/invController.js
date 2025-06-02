const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async (req, res, next) => {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      const error = new Error("No vehicles found for this classification")
      error.status = 404
      throw error
    }

    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build inventory detail view (Task 1)
 * ************************** */
invCont.buildByInventoryId = async (req, res, next) => {
  try {
    const invId = req.params.invId
    const data = await invModel.getInventoryById(invId)

    if (!data || data.length === 0) {
      const error = new Error("Vehicle not found")
      error.status = 404
      throw error
    }

    const vehicle = data[0]
    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle)
    const nav = await utilities.getNav()

    res.render("./inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicleHTML,
      vehicle,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Trigger intentional error (Task 3)
 * ************************** */
invCont.triggerError = async (req, res, next) => {
  try {
    // Intentionally throw a 500 error
    const error = new Error("Intentional 500 Error for Testing Purposes")
    error.status = 500
    throw error
  } catch (error) {
    next(error)
  }
}

module.exports = invCont
