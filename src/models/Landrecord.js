const mongoose = require("mongoose");

const LandRecordSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  documentHash: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true },
  status: { type: String, enum: ["Owned", "Pending Transfer"], default: "Owned" },
  documentFile: {
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String },
    fileSize: { type: Number },
    uploadDate: { type: Date, default: Date.now }
  }
});

module.exports = mongoose.model("LandRecord", LandRecordSchema);
