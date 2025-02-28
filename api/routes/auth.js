const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");
const requireLogin = passport.authenticate("local", { session: false });
const router = express.Router();

const authenticate = require("../controllers/authentication");
// GET ALL
router.post("/", authenticate.signup);

router.post("/signin", requireLogin, authenticate.signin);

module.exports = router;
