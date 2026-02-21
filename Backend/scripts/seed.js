const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ArticleSection = require('../models/ArticleSection');
const FamilySection = require('../models/FamilySection');
const { uploadToCloudinary } = require('../utils/cloudinary');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleArticles = [
    {
        title: "Political Commentary",
        articles: [
            { title: "The State of Modern Governance", src: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800", alt: "Governance" },
            { title: "Policy Shifts in the 21st Century", src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800", alt: "Policy" }
        ]
    },
    {
        title: "Constitutional Matters",
        articles: [
            { title: "Judicial Activism vs Restraint", src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800", alt: "Judiciary" },
            { title: "The Evolution of Basic Structure", src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800", alt: "Constitution" }
        ]
    }
];

const sampleFamily = [
    {
        title: "Early Days",
        images: [
            { title: "Old Family Portrait", src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800" },
            { title: "Grampa's Vintage Car", src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800" }
        ]
    },
    {
        title: "Family Trips",
        images: [
            { title: "Mountain Trip 2022", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" },
            { title: "Beach Vacation", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" }
        ]
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await ArticleSection.deleteMany({});
        await FamilySection.deleteMany({});
        console.log('Cleared existing data.');

        // Seed Article Sections
        console.log('Seeding Articles...');
        for (const secData of sampleArticles) {
            const uploadedArticles = [];
            for (const art of secData.articles) {
                console.log(`Uploading article image: ${art.title}`);
                const cloudinaryUrl = await uploadToCloudinary(art.src, 'articles');
                uploadedArticles.push({ ...art, src: cloudinaryUrl, order: uploadedArticles.length });
            }
            await ArticleSection.create({
                title: secData.title,
                articles: uploadedArticles,
                order: sampleArticles.indexOf(secData)
            });
        }

        // Seed Family Sections
        console.log('Seeding Family Gallery...');
        for (const secData of sampleFamily) {
            const uploadedImages = [];
            for (const img of secData.images) {
                console.log(`Uploading family image: ${img.title}`);
                const cloudinaryUrl = await uploadToCloudinary(img.src, 'family');
                uploadedImages.push({ ...img, src: cloudinaryUrl, order: uploadedImages.length });
            }
            await FamilySection.create({
                title: secData.title,
                images: uploadedImages,
                order: sampleFamily.indexOf(secData)
            });
        }

        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
