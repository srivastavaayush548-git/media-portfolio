const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const FamilySection = require('../models/FamilySection');
const { uploadToCloudinary } = require('../utils/cloudinary');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const ASSETS_BASE = path.join('d:', 'DEV', 'FreeLance', 'media-portfolio', 'Frontend', 'src', 'assets', 'Images');

const foldersToProcess = [
    { name: 'Career', title: 'Professional Journey' },
    { name: 'Vips/PrimeMinister', title: 'With Prime Minister' },
    { name: 'Vips/President', title: 'With President' },
    { name: 'Vips/VicePresident', title: 'With Vice President' },
    { name: 'Vips/FormerPresident', title: 'With Former Presidents' },
    { name: 'Vips/FormerVP', title: 'With Former Vice Presidents' },
    { name: 'Vips/ArunJaitley', title: 'With Arun Jaitley' },
    { name: 'Vips/DefenceMinister', title: 'With Defence Ministers' },
    { name: 'Vips/FinanceMinister', title: 'With Finance Ministers' }
];

const processAdditionalPhotos = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB...');

        for (const folder of foldersToProcess) {
            const dirPath = path.join(ASSETS_BASE, ...folder.name.split('/'));
            if (!fs.existsSync(dirPath)) continue;

            const files = fs.readdirSync(dirPath).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
            if (files.length === 0) continue;

            console.log(`Processing folder: ${folder.name} (${files.length} images)`);
            const uploadedImages = [];
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = path.join(dirPath, file);
                console.log(`Uploading [${i+1}/${files.length}]: ${file}`);
                
                try {
                    const cloudinaryUrl = await uploadToCloudinary(filePath, 'gallery');
                    uploadedImages.push({
                        title: file.split('.')[0].replace(/ WhatsApp Image \d{4}-\d{2}-\d{2} at \d{2}\.\d{2}\.\d{2} [AP]M/g, '').replace(/_/g, ' ').trim(),
                        src: cloudinaryUrl,
                        order: i
                    });
                    
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Error uploading ${file}:`, err.message);
                }
            }

            if (uploadedImages.length > 0) {
                await FamilySection.create({
                    title: folder.title,
                    images: uploadedImages,
                    order: 10 + foldersToProcess.indexOf(folder) // Add after family sections
                });
                console.log(`Section "${folder.title}" created.`);
            }
        }

        console.log('Additional photos processed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Processing Error:', error);
        process.exit(1);
    }
};

processAdditionalPhotos();
