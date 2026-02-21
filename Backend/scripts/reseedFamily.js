const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const FamilySection = require('../models/FamilySection');
const { uploadToCloudinary } = require('../utils/cloudinary');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const FAMILY_ASSETS_DIR = path.join('d:', 'DEV', 'FreeLance', 'media-portfolio', 'Frontend', 'src', 'assets', 'Images', 'Family');

const familyStructure = [
  {
    title: "Family",
    images: [
      { file: "familycover.jpeg", alt: "Family portrait", title: "Family portrait" },
      { file: "family2.jpeg", alt: "Family gathering", title: "Family gathering" },
      { file: "siblings.jpeg", alt: "With my siblings", title: "With my siblings" },
      { file: "family3.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "family4.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "family5.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "family6.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "family7.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "family8.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.52 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.52 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.53 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.53 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.54 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.08.54 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.01 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.02 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.02 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.02 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.03 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.03 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.03 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.04 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.04 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.05 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.05 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.05 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.06 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.06 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.06 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.07 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.07 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.07 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.08 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.08 PM (2).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.08 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.09 PM (1).jpeg", alt: "Family moment", title: "Family moment" },
      { file: "WhatsApp Image 2026-02-16 at 2.09.09 PM.jpeg", alt: "Family moment", title: "Family moment" },
      { file: "FatherAndMother.jpeg", alt: "Father and Mother", title: "Father and Mother" },
      { file: "FatherAndMother2.jpeg", alt: "Father and Mother", title: "Father and Mother" },
    ]
  },
  {
    title: "With my wife Pushpa Girimaji",
    images: [
      { file: "wife- pushpa.jpeg", alt: "With my wife Pushpa Girimaji", title: "With my wife Pushpa Girimaji" },
      { file: "withwife1.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withwife2.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withwife3.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withwife4.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withWife5.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withwife7.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
      { file: "withwife9.jpeg", alt: "Memorable moments together", title: "Memorable moments together" },
    ]
  },
  {
    title: "With our son Ujwal Arkalgud & Grandchildren",
    images: [
      { file: "Family.jpeg", alt: "Us with our son, daughter-in-law and the grand children", title: "Us with our son, daughter-in-law and the grand children" },
      { file: "son.jpeg", alt: "With our son Ujwal Arkalgud", title: "With our son Ujwal Arkalgud" },
      { file: "SirWithSon.jpeg", alt: "With our son Ujwal Arkalgud", title: "With our son Ujwal Arkalgud" },
      { file: "sirWifewithSon.jpeg", alt: "With my wife and son", title: "With my wife and son" },
      { file: "daughterinlaw.jpeg", alt: "My daughter-in-law", title: "My daughter-in-law" },
      { file: "sonand dougtherinlaw.jpeg", alt: "My son and daughter-in-law", title: "My son and daughter-in-law" },
      { file: "sonand dougtherinlaw2.jpeg", alt: "My son and daughter-in-law", title: "My son and daughter-in-law" },
      { file: "GRANDCHILDRENS.jpeg", alt: "Our grand children", title: "Our grand children" },
      { file: "grandchildren.jpeg", alt: "Our grand children", title: "Our grand children" },
      { file: "grandchildren2.jpeg", alt: "Our grand children", title: "Our grand children" },
    ]
  },
];

const reseedFamily = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing family data
    await FamilySection.deleteMany({});
    console.log('Cleared existing family data.');

    for (let i = 0; i < familyStructure.length; i++) {
        const sec = familyStructure[i];
        console.log(`Processing section: ${sec.title}`);
        
        const uploadedImages = [];
        for (let j = 0; j < sec.images.length; j++) {
            const img = sec.images[j];
            const filePath = path.join(FAMILY_ASSETS_DIR, img.file);
            
            if (fs.existsSync(filePath)) {
                console.log(`[${j+1}/${sec.images.length}] Uploading: ${img.file}`);
                try {
                    const cloudinaryUrl = await uploadToCloudinary(filePath, 'family');
                    uploadedImages.push({
                        title: img.title,
                        src: cloudinaryUrl,
                        order: j
                    });
                    
                    // Optionally delete local file
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Failed to upload ${img.file}:`, err.message);
                }
            } else {
                console.warn(`File not found: ${img.file}`);
            }
        }

        if (uploadedImages.length > 0) {
            await FamilySection.create({
                title: sec.title,
                images: uploadedImages,
                order: i
            });
            console.log(`Section "${sec.title}" created with ${uploadedImages.length} images.`);
        }
    }

    console.log('Family data re-seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Reseed error:', error);
    process.exit(1);
  }
};

reseedFamily();
