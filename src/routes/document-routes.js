const express = require("express");
const { uploadDocument, getDocuments } = require("../controllers/document-controller");
const auth = require("../middleware/auth-middleware");
const upload = require("../middleware/upload-middleware");

const router = express.Router();

router.post("/upload", auth, upload, uploadDocument);
router.get("/", auth, getDocuments);

module.exports = router;
