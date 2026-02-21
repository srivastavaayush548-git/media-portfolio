const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const ArticleSection = require('../models/ArticleSection');
const FamilySection = require('../models/FamilySection');
const { uploadToCloudinary } = require('../utils/cloudinary');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const ARTICLE_ASSETS_DIR = path.join('d:', 'DEV', 'FreeLance', 'media-portfolio', 'Frontend', 'src', 'assets', 'Images', 'Articles');
const FAMILY_ASSETS_DIR = path.join('d:', 'DEV', 'FreeLance', 'media-portfolio', 'Frontend', 'src', 'assets', 'Images', 'Family');

const uploadAndStore = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB...');

        // 1. Process Articles
        console.log('Processing real articles...');
        if (fs.existsSync(ARTICLE_ASSETS_DIR)) {
            const articleFiles = fs.readdirSync(ARTICLE_ASSETS_DIR).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
            console.log(`Found ${articleFiles.length} article images.`);

            if (articleFiles.length > 0) {
                const uploadedArticles = [];
                for (let i = 0; i < articleFiles.length; i++) {
                    const file = articleFiles[i];
                    const filePath = path.join(ARTICLE_ASSETS_DIR, file);
                    console.log(`[${i+1}/${articleFiles.length}] Uploading article: ${file}`);
                    
                    try {
                        const cloudinaryUrl = await uploadToCloudinary(filePath, 'articles');
                        uploadedArticles.push({
                            title: file.split('.')[0].replace(/ WhatsApp Image \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2} [AP]M/g, '').trim() || "Article Image",
                            src: cloudinaryUrl,
                            order: i
                        });
                        
                        // Delete local file
                        fs.unlinkSync(filePath);
                        console.log(`Deleted local file: ${file}`);
                    } catch (err) {
                        console.error(`Failed to upload/delete ${file}:`, err.message);
                    }
                }

                await ArticleSection.create({
                    title: "Journalism & Media Coverage",
                    articles: uploadedArticles,
                    order: 0
                });
                console.log('Article section created in DB.');
            }
        }

        // 2. Process Family
        console.log('Processing real family photos...');
        if (fs.existsSync(FAMILY_ASSETS_DIR)) {
            const familyFiles = fs.readdirSync(FAMILY_ASSETS_DIR).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
            console.log(`Found ${familyFiles.length} family images.`);

            if (familyFiles.length > 0) {
                const uploadedFamily = [];
                for (let i = 0; i < familyFiles.length; i++) {
                    const file = familyFiles[i];
                    const filePath = path.join(FAMILY_ASSETS_DIR, file);
                    console.log(`[${i+1}/${familyFiles.length}] Uploading family photo: ${file}`);

                    try {
                        const cloudinaryUrl = await uploadToCloudinary(filePath, 'family');
                        uploadedFamily.push({
                            title: file.split('.')[0].replace(/ WhatsApp Image \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2} [AP]M/g, '').trim() || "Family Photo",
                            src: cloudinaryUrl,
                            order: i
                        });

                        // Delete local file
                        fs.unlinkSync(filePath);
                        console.log(`Deleted local file: ${file}`);
                    } catch (err) {
                        console.error(`Failed to upload/delete ${file}:`, err.message);
                    }
                }

                await FamilySection.create({
                    title: "Personal Archives",
                    images: uploadedFamily,
                    order: 0
                });
                console.log('Family section created in DB.');
            }
        }

        console.log('All real photos processed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Batch Upload Error:', error);
        process.exit(1);
    }
};

uploadAndStore();
