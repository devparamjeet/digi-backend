const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new vendor
exports.registerVendor = async (req, res) => {
    try {
        const { name, email, password, contactNumber, company, services } = req.body;

        let vendor = await Vendor.findOne({ email });
        if (vendor) return res.status(400).json({ message: "Vendor already registered" });

        vendor = new Vendor({ name, email, password, contactNumber, company, services });
        await vendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Vendor Login
exports.loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;

        const vendor = await Vendor.findOne({ email });
        if (!vendor) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all vendors
exports.getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
