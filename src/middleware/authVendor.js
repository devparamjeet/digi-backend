const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

exports.authVendor = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) return res.status(403).json({ message: "Access denied. Only vendors can perform this action." });

    req.vendor = vendor; // Attach vendor to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
