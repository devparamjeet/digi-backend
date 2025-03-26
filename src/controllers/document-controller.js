const Document = require("../models/document-model");

exports.uploadDocument = async (req, res) => {
    try {
        const { filename, fileUrl } = req.body;
        const newDocument = new Document({ user: req.user.id, filename, fileUrl });

        await newDocument.save();
        res.status(201).json({ message: "Document uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.user.id });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
