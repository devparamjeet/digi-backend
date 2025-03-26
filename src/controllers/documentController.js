const mongoose = require("mongoose");
const Document = require("../models/Document");
const LandRecord = require("../models/Landrecord");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/documents/"); // Save files to uploads/documents/
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Upload Document (Only Vendor Can Upload)
exports.uploadDocument = async (req, res) => {
    try {
        const { landRecordId, documentType } = req.body;

        if (!mongoose.Types.ObjectId.isValid(landRecordId)) {
            return res.status(400).json({ message: "Invalid Land Record ID" });
        }

        const landRecord = await LandRecord.findById(landRecordId);
        if (!landRecord) return res.status(404).json({ message: "Land record not found" });

        const document = new Document({
            vendor: req.vendor._id,
            landRecord: landRecordId,
            documentType,
            documentUrl: `/uploads/documents/${req.file.filename}`
        });

        await document.save();
        res.status(201).json({ message: "Document uploaded successfully", document });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Documents (Admin or Vendor)
exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find().populate("vendor", "name email").populate("landRecord", "location area");
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
