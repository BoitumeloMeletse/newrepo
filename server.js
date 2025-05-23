/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const router = express.Router()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index Route
app.get("/", function(req, res){
  res.render("index", { title: "Home" })
})
// custom Route
app.get("/custom", (req, res) => {
  res.render("custom", { title: "Custom" })
})

// SUV Route
app.get('/suv', (req, res) => {
  res.render('suv', { title: 'SUV' });
});

// Truck Route
app.get('/truck', (req, res) => {
  res.render('truck', { title: 'Truck' });
});

// Sedan Route
app.get('/sedan', (req, res) => {
  res.render('sedan', { title: 'Sedan' });
});

// Sport Route
app.get('/sport', (req, res) => {
  res.render('sport', { title: 'Sport' });
});



// Intentional error route
router.get("/error", (req, res, next) => {
  res.render('error', { title: 'Error' });
  const error = new Error("Intentional Server Error")
  error.status = 500
  next(error)
})

module.exports = router

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500)
  res.render("error", {
    title: "Error",
    message: err.message || "Internal Server Error",
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
