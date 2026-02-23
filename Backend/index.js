const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const articleRoutes = require('./routes/articleRoutes');
const familyRoutes = require('./routes/familyRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Media Portfolio API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
