const express = require("express");
const { registerVendor, getVendors, loginVendor } = require("../controllers/vendorController");

const router = express.Router();

router.post("/register", registerVendor); // Register a new vendor
router.post("/login", loginVendor); // Login Vendor
router.get("/", getVendors); // Get all registered vendors

module.exports = router;
