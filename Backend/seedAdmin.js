const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedAdmin = async () => {
    try {
        await Admin.deleteMany({ username: 'admin' });

        const admin = new Admin({
            username: 'admin',
            password: 'admindataa'
        });

        await admin.save();
        console.log('Admin user seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
