const express = require("express");
const { uploadDocument, getDocuments } = require("../controllers/documentController");
const { authVendor } = require("../middleware/authVendor");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/documents/" }); // Temp storage for files

router.post("/upload", authVendor, upload.single("file"), uploadDocument); // Vendor uploads document
router.get("/", getDocuments); // Get all documents (for admin & vendors)

module.exports = router;
