require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./src/config/db");
const auths = require("./src/routes/authRoutes");
const landRoutes = require("./src/routes/landRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const documentRoutes = require("./src/routes/documentRoutes");


const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", auths);
app.use("/api/lands", landRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/documents", documentRoutes);
app.use("/uploads", express.static("uploads")); // Serve uploaded files


// Add enhanced root route
app.get("/", (req, res) => {
    try {
        res.json({
            status: "success",
            message: "Server is Online",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(503).json({
            status: "error",
            message: "Server is Offline",
            timestamp: new Date().toISOString()
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
