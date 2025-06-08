
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
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const session = require("express-session")
const pool = require('./database/')
const bodyParser = require("body-parser")
const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root



/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

/* ***********************
 * Routes
 *************************/
app.use(static)
//app.get("/", baseController.buildHome)
app.get("/", utilities.handleErrors(baseController.buildHome))

/* ***********************
 * Routes with Error Handling
 *************************/
app.use(express.static("public"))

// Inventory routes
//app.use("/inv", inventoryRoute)
app.use("/inv", require("./routes/inventoryRoute"))


// Account routes 
//app.use("/account", accountRoute)
app.use("/account", require("./routes/accountRoute"))


// // 404 Error Handler - must be after all other routes
// app.use((req, res, next) => {
//   const error = new Error(`Page not found: ${req.originalUrl}`)
//   error.status = 404
//   next(error)
// })

/* ***********************
 * Global Error Handling Middleware (Task 2)
 *************************/
app.use(async (err, req, res, next) => {
  console.error("Error occurred:", err.stack)

  let nav = ""
  try {
    nav = await utilities.getNav()
  } catch (navError) {
    console.error("Error getting navigation:", navError)
    nav = "<ul><li><a href='/'>Home</a></li></ul>"
  }

  const status = err.status || 500
  const message = err.message || "Something went wrong. Please try again later."

  res.status(status).render("errors/error", {
    title: `Error ${status}`,
    nav: nav,
    message: message,
    status: status,
    layout: "./layouts/layout",
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
