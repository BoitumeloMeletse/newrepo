/* ***************************
 *  Controller to trigger intentional error
 * ************************** */
const triggerError = async (req, res, next) => {
  try {
    // Intentionally throw an error
    throw new Error("This is an intentional error for testing purposes")
  } catch (error) {
    next(error)
  }
}

module.exports = { triggerError }
