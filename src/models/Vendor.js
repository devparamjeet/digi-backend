const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added password field
  contactNumber: { type: String, required: true },
  company: { type: String, required: true },
  services: { type: [String], required: true }, // e.g., ["Surveying", "Legal Consulting"]
  registeredDate: { type: Date, default: Date.now }
});

// Hash password before saving
VendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Vendor", VendorSchema);
