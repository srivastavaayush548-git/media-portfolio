const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const familyRoutes = require("./routes/familyRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const vipRoutes = require("./routes/vipRoutes");

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const { protect } = require("./utils/authMiddleware");

// CORS Configuration
const corsOptions = {
  origin: [
    "https://www.suryaprakasharkalgud.in",
    "https://suryaprakasharkalgud.in",
    "http://localhost:5173", // For local development
    "http://localhost:3000", // For local development
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" })); // Increased limit for base64 media
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/vips", vipRoutes);

const PORT = process.env.PORT || 5000;

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Media Portfolio API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
