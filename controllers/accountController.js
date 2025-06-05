const utilities = require("../utilities/")
const accountModel = require("../models/account-model")

const accountCont = {}

/* ****************************************
 *  Deliver login view
 * *************************************** */
accountCont.buildLogin = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ****************************************
 *  Deliver registration view
 * *************************************** */
accountCont.buildRegister = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ****************************************
 *  Process Registration
 * *************************************** */
accountCont.registerAccount = async (req, res) => {
  try {
    const nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    console.log("Registration attempt for:", account_email)

    // Check if email already exists
    const emailExists = await accountModel.checkExistingEmail(account_email)
    if (emailExists) {
      req.flash("notice", "Email already exists. Please use a different email or login.")
      return res.status(400).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
        account_firstname,
        account_lastname,
        account_email,
      })
    }

    // Register the account
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    )

    console.log("Registration result:", regResult)

    if (regResult && regResult.rows && regResult.rows.length > 0) {
      req.flash("notice", `Congratulations, you're registered ${account_firstname}. Please log in.`)
      res.status(201).render("account/login", {
        title: "Login",
        nav,
        errors: null,
      })
    } else {
      console.error("Registration failed - no result returned")
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }
  } catch (error) {
    console.error("Registration error:", error)
    req.flash("notice", "Sorry, there was an error processing the registration.")
    const nav = await utilities.getNav()
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

module.exports = accountCont
