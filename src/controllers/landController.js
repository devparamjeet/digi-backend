const LandRecord = require("../models/Landrecord");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "uploads/land-documents";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only PDF, JPEG, and PNG files are allowed."));
        }
    }
});

exports.addLandRecord = async (req, res) => {
    try {
        const { location, area } = req.body;
        const documentHash = Math.random().toString(36).substring(2, 15);

        const landRecord = new LandRecord({
            owner: req.vendor._id,
            documentHash,
            location,
            area,
            status: "Owned",
        });

        // Handle file upload if present
        if (req.file) {
            landRecord.documentFile = {
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                uploadDate: new Date()
            };
        }

        await landRecord.save();

        // Transform the response to match getUserLandRecords format
        const transformedRecord = {
            ...landRecord.toObject(),
            owner: req.vendor ? {
                name: req.vendor.name,
                email: req.vendor.email,
                contactNumber: req.vendor.contactNumber,
                company: req.vendor.company
            } : {
                name: "Unknown Owner",
                email: "N/A",
                contactNumber: "N/A",
                company: "N/A"
            },
            document: landRecord.documentFile ? {
                fileName: landRecord.documentFile.fileName,
                fileType: landRecord.documentFile.fileType,
                fileSize: landRecord.documentFile.fileSize,
                uploadDate: landRecord.documentFile.uploadDate,
                downloadUrl: `/api/land/download/${landRecord._id}/${encodeURIComponent(landRecord.documentFile.fileName)}`,
                previewUrl: landRecord.documentFile.fileType && landRecord.documentFile.fileType.startsWith('image/') 
                    ? `/api/land/download/${landRecord._id}/${encodeURIComponent(landRecord.documentFile.fileName)}`
                    : null
            } : null
        };

        res.status(201).json({ 
            message: "Land record added successfully", 
            landRecord: transformedRecord
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Land Records
exports.getUserLandRecords = async (req, res) => {
    try {
        const landRecords = await LandRecord.find()
            .populate({
                path: "owner",
                model: "Vendor",
                select: "name email contactNumber company"
            });

        // Transform the response to handle null owners and include download URLs
        const transformedRecords = landRecords.map(record => ({
            ...record.toObject(),
            owner: record.owner ? {
                name: record.owner.name,
                email: record.owner.email,
                contactNumber: record.owner.contactNumber,
                company: record.owner.company
            } : {
                name: "Unknown Owner",
                email: "N/A",
                contactNumber: "N/A",
                company: "N/A"
            },
            document: record.documentFile ? {
                fileName: record.documentFile.fileName,
                fileType: record.documentFile.fileType,
                fileSize: record.documentFile.fileSize,
                uploadDate: record.documentFile.uploadDate,
                downloadUrl: `/api/land/download/${record._id}/${encodeURIComponent(record.documentFile.fileName)}`,
                previewUrl: record.documentFile.fileType && record.documentFile.fileType.startsWith('image/') 
                    ? `/api/land/download/${record._id}/${encodeURIComponent(record.documentFile.fileName)}`
                    : null
            } : null
        }));

        res.json(transformedRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Download document
exports.downloadDocument = async (req, res) => {
    try {
        const landRecord = await LandRecord.findById(req.params.id);
        
        if (!landRecord || !landRecord.documentFile) {
            return res.status(404).json({ message: "Document not found" });
        }

        const filePath = landRecord.documentFile.filePath;
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }

        res.download(filePath, landRecord.documentFile.fileName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};