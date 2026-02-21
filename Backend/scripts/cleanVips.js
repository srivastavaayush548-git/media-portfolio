const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FamilySection = require('../models/FamilySection');

dotenv.config();

const cleanVips = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // We assigned order >= 10 to VIP/Career sections in my previous script
        const result = await FamilySection.deleteMany({ order: { $gte: 10 } });
        console.log(`Deleted ${result.deletedCount} VIP/Career sections from database.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

cleanVips();
