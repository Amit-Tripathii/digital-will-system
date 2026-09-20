const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const assetRoutes = require("./routes/assets");
const nomineeRoutes = require("./routes/nominees");
const authRoutes = require("./routes/auth");
const startCronJobs = require("./utils/cronJobs");
const deadmanRoutes = require("./routes/deadman");
dotenv.config();



connectDB();
startCronJobs();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/nominees", nomineeRoutes);
app.use("/api/deadman", deadmanRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
