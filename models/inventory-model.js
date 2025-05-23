const db = require("../database/connection")

exports.getVehicleById = async (id) => {
  const query = "SELECT * FROM inventory WHERE id = $1"
  const values = [id]
  const result = await db.query(query, values)
  return result.rows[0]
}