const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true }, // Linked to Vendor
  landRecord: { type: mongoose.Schema.Types.ObjectId, ref: "LandRecord", required: true }, // Linked to Land Record
  documentType: { type: String, required: true }, // e.g., "Ownership Proof", "Survey Report"
  documentUrl: { type: String, required: true }, // Store the file URL
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", DocumentSchema);
