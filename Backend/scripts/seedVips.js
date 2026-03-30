const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const VipSection = require('../models/VipSection');
const { uploadToCloudinary } = require('../utils/cloudinary');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const VIPS_DIR = path.join(__dirname, '..', '..', 'Frontend', 'src', 'assets', 'Images', 'Vips');

const vipsStructure = [
  {
    title: "With the Hon'ble President of India Smt. Droupadi Murmu",
    images: [
      { file: 'President/DroupadiMurmu_1.jpeg', title: "With the Hon'ble President of India Smt. Droupadi Murmu" },
      { file: 'President/DroupadiMurmu_2.jpeg', title: "With the Hon'ble President of India Smt. Droupadi Murmu" },
      { file: 'President/DroupadiMurmu_3.jpeg', title: "With the Hon'ble President of India Smt. Droupadi Murmu" },
      { file: 'President/DroupadiMurmu_4.jpeg', title: "With the Hon'ble President of India Smt. Droupadi Murmu" },
    ]
  },
  {
    title: "With the Hon'ble Prime Minister of India Shri Narendra Modi",
    images: [
      { file: 'PrimeMinister/Modi_1.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_2.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_3.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_4.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_5.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_6.jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_7.jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_8.jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/Modi_9.jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi.jpg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi(4).jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi(5).jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi(6).jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi(7).jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
      { file: 'PrimeMinister/modi(8).jpeg', title: "With the Hon'ble Prime Minister of India Shri Narendra Modi" },
    ]
  },
  {
    title: "With the Hon'ble President of India Shri Ram Nath Kovind",
    images: [
      { file: 'FormerPresident/Kovind_1.jpg', title: "With the Hon'ble President of India Shri Ram Nath Kovind" },
      { file: 'FormerPresident/Kovind_2.jpg', title: "With the Hon'ble President of India Shri Ram Nath Kovind" },
      { file: 'FormerPresident/Kovind_3.jpeg', title: "With the Hon'ble President of India Shri Ram Nath Kovind" },
      { file: 'FormerPresident/Kovind_4.jpeg', title: "With the Hon'ble President of India Shri Ram Nath Kovind" },
    ]
  },
  {
    title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu",
    images: [
      { file: 'FormerVP/VenkaiahNaidu_1.jpg', title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu" },
      { file: 'FormerVP/VenkaiahNaidu_2.jpeg', title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu" },
      { file: 'FormerVP/VenkaiahNaidu_3.jpeg', title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu" },
      { file: 'FormerVP/VenkaiahNaidu_4.jpeg', title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu" },
      { file: 'FormerVP/VenkaiahNaidu_5.jpeg', title: "With the Hon'ble Vice President of India Shri M. Venkaiah Naidu" },
    ]
  },
  {
    title: "With the Hon'ble Defence Minister of India Shri Rajnath Singh",
    images: [
      { file: 'DefenceMinister/RajnathSingh_2.jpeg', title: "With the Hon'ble Defence Minister of India Shri Rajnath Singh" },
      { file: 'DefenceMinister/RajnathSingh_3.jpeg', title: "With the Hon'ble Defence Minister of India Shri Rajnath Singh" },
      { file: 'DefenceMinister/RajnathSingh_4.jpeg', title: "With the Hon'ble Defence Minister of India Shri Rajnath Singh" },
    ]
  },
  {
    title: "With the Hon'ble Finance Minister Smt. Nirmala Sitharaman",
    images: [
      { file: 'FinanceMinister/Sitharaman_1.jpeg', title: "With the Hon'ble Finance Minister Smt. Nirmala Sitharaman" },
      { file: 'FinanceMinister/Sitharaman_2.jpeg', title: "With the Hon'ble Finance Minister Smt. Nirmala Sitharaman" },
      { file: 'FinanceMinister/Sitharaman_3.jpeg', title: "With the Hon'ble Finance Minister Smt. Nirmala Sitharaman" },
    ]
  },
  {
    title: "With the Hon'ble Finance Minister Late Shri Arun Jaitley",
    images: [
      { file: 'ArunJaitley/ArunJaitley_1.jpg', title: "With the Hon'ble Finance Minister Late Shri Arun Jaitley" },
      { file: 'ArunJaitley/ArunJaitley_2.jpeg', title: "With the Hon'ble Finance Minister Late Shri Arun Jaitley" },
      { file: 'ArunJaitley/ArunJaitley_3.jpg', title: "With the Hon'ble Finance Minister Late Shri Arun Jaitley" },
      { file: 'ArunJaitley/ArunJaitley_4.jpg', title: "With the Hon'ble Finance Minister Late Shri Arun Jaitley" },
      { file: 'ArunJaitley/FormerPM_1.jpg', title: "With Former Prime Minister" },
      { file: 'ArunJaitley/FormerPM_2.jpg', title: "With Former Prime Minister" },
    ]
  },
  {
    title: "With the Hon'ble Governor of Haryana Shri Bandaru Dattatreya",
    images: [
      { file: 'GovernorH/Dattatreya_1.jpeg', title: "With the Hon'ble Governor of Haryana Shri Bandaru Dattatreya" },
      { file: 'GovernorH/Dattatreya_2.jpeg', title: "With the Hon'ble Governor of Haryana Shri Bandaru Dattatreya" },
      { file: 'GovernorH/Dattatreya_3.jpeg', title: "With the Hon'ble Governor of Haryana Shri Bandaru Dattatreya" },
      { file: 'GovernorH/Dattatreya_4.jpeg', title: "With the Hon'ble Governor of Haryana Shri Bandaru Dattatreya" },
    ]
  },
  {
    title: "With the Hon'ble RSS Chief Shri Mohan Bhagwat",
    images: [
      { file: 'RSS/MohanBhagwat_1.jpeg', title: "With the Hon'ble RSS Chief Shri Mohan Bhagwat" },
      { file: 'RSS/MohanBhagwat_2.jpeg', title: "With the Hon'ble RSS Chief Shri Mohan Bhagwat" },
      { file: 'RSS/MohanBhagwat_3.jpeg', title: "With the Hon'ble RSS Chief Shri Mohan Bhagwat" },
      { file: 'RSS/MohanBhagwat_4.jpeg', title: "With the Hon'ble RSS Chief Shri Mohan Bhagwat" },
    ]
  },
  {
    title: "With the Hon'ble National Security Advisor Shri Ajit Doval",
    images: [
      { file: 'NSA/AjitDoval_1.jpeg', title: "With the Hon'ble National Security Advisor Shri Ajit Doval" },
      { file: 'NSA/AjitDoval_2.jpeg', title: "With the Hon'ble National Security Advisor Shri Ajit Doval" },
    ]
  },
  {
    title: "With the Hon'ble Supreme Court Judge Shri Shivraj Patil",
    images: [
      { file: 'FormerJudge/Judge_1.jpeg', title: "With the Hon'ble Supreme Court Judge Shri Shivraj Patil" },
      { file: 'FormerJudge/Judge_2.jpeg', title: "With the Hon'ble Supreme Court Judge" },
      { file: 'FormerJudge/Judge_3.jpeg', title: "With the Hon'ble Supreme Court Judge" },
      { file: 'FormerJudge/Judge_4.jpeg', title: "With the Hon'ble Supreme Court Judge" },
      { file: 'FormerJudge/Judge_5.jpeg', title: "With the Hon'ble Supreme Court Judge" },
    ]
  },
  {
    title: "With Former Chief Justice of India Shri M.N. Venkatachalaiah",
    images: [
      { file: 'venkata/venkata.jpeg', title: "With Former Chief Justice of India Shri M.N. Venkatachalaiah" },
    ]
  },
  {
    title: "With the Hon'ble Former UK Prime Minister Shri Rishi Sunak",
    images: [
      { file: 'RishiSunak/rsnk(1).jpeg', title: "With the Hon'ble Former UK Prime Minister Shri Rishi Sunak" },
      { file: 'RishiSunak/rsnk(2).jpeg', title: "With the Hon'ble Former UK Prime Minister Shri Rishi Sunak" },
      { file: 'RishiSunak/rsnk(3).jpeg', title: "With the Hon'ble Former UK Prime Minister Shri Rishi Sunak" },
      { file: 'RishiSunak/rsnk(4).jpeg', title: "With the Hon'ble Former UK Prime Minister Shri Rishi Sunak" },
    ]
  },
  {
    title: "With the Hon'ble Former Prime Minister of India Shri H.D. Deve Gowda",
    images: [
      { file: 'FormerPm/h.d.jpeg', title: "With the Hon'ble Former Prime Minister of India Shri H.D. Deve Gowda" },
    ]
  },
  {
    title: "With the Hon'ble Governor",
    images: [
      { file: 'Governor/Governor_1.jpg', title: "With the Hon'ble Governor" },
      { file: 'Governor/Governor_2.jpeg', title: "With the Hon'ble Governor" },
    ]
  },
  {
    title: "With Chief Ministers",
    images: [
      { file: 'ChiefMinister/CM_1.jpg', title: "With Chief Minister" },
      { file: 'ChiefMinister/CM_2.jpg', title: "With Chief Minister" },
    ]
  },
  {
    title: "With Members of Parliament",
    images: [
      { file: 'MPs/MP_1.jpeg', title: "With Member of Parliament" },
      { file: 'MPs/MP_2.jpg', title: "With Member of Parliament" },
      { file: 'MPs/MP_3.jpg', title: "With Member of Parliament" },
      { file: 'MPs/MP_4.jpg', title: "With Member of Parliament" },
      { file: 'MPs/MP_5.jpeg', title: "With Member of Parliament" },
      { file: 'MPs/MP_6.jpeg', title: "With Member of Parliament" },
      { file: 'MPs/MP_7.jpeg', title: "With Member of Parliament" },
    ]
  },
  {
    title: "With State Ministers",
    images: [
      { file: 'StateMinisters/StateMinister_1.jpg', title: "With State Minister" },
      { file: 'StateMinisters/StateMinister_2.jpg', title: "With State Minister" },
    ]
  },
  {
    title: "With Vice President Shri C.P. Radhakrishnan",
    images: [
      { file: 'VicePresident/CPRadhakrishnan_1.jpg', title: "With Vice President Shri C.P. Radhakrishnan" },
    ]
  },
  {
    title: "CELEBRITIES",
    images: [
      { file: 'Eminent/light.mp4', title: "Lighting the lamp", type: 'video' },
      { file: 'Eminent/Eminent_0.jpg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_1.jpeg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_2.jpeg', title: "With Kajol" },
      { file: 'Eminent/Eminent_3.jpeg', title: "With Ranjeet" },
      { file: 'Eminent/Eminent_4.jpeg', title: "With Kailash Kher" },
      { file: 'Eminent/Eminent_5.jpeg', title: "With Jitendra Khanna" },
      { file: 'Eminent/Eminent_7.jpeg', title: "With Mukesh Khanna" },
      { file: 'Eminent/Eminent_8.jpeg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_9.jpeg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_10.jpeg', title: "With Kangana Ranaut" },
      { file: 'Eminent/Eminent_11.jpg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_12.jpg', title: "With Eminent Personality" },
      { file: 'Eminent/Eminent_14.jpg', title: "With Eminent Personality" },
      { file: 'Eminent/kajal.jpeg', title: "With Eminent Personality" },
    ]
  },
];

const seedVips = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    await VipSection.deleteMany({});
    console.log('Cleared existing VIPs data.');

    for (let i = 0; i < vipsStructure.length; i++) {
      const sec = vipsStructure[i];
      console.log(`\nProcessing section [${i + 1}/${vipsStructure.length}]: ${sec.title}`);

      const uploadedImages = [];
      for (let j = 0; j < sec.images.length; j++) {
        const img = sec.images[j];
        const filePath = path.join(VIPS_DIR, img.file);

        if (fs.existsSync(filePath)) {
          console.log(`  [${j + 1}/${sec.images.length}] Uploading: ${img.file}`);
          try {
            const resourceType = (img.type === 'video') ? 'video' : 'image';
            const cloudinaryUrl = await uploadToCloudinary(filePath, 'vips', resourceType);
            uploadedImages.push({
              title: img.title,
              src: cloudinaryUrl,
              order: j,
              type: img.type || 'image'
            });
          } catch (err) {
            console.error(`  Failed to upload ${img.file}:`, err.message);
          }
        } else {
          console.warn(`  File not found, skipping: ${img.file}`);
        }
      }

      if (uploadedImages.length > 0) {
        await VipSection.create({
          title: sec.title,
          images: uploadedImages,
          order: i
        });
        console.log(`  Section "${sec.title}" created with ${uploadedImages.length} images.`);
      } else {
        console.warn(`  No images uploaded for section "${sec.title}", skipping.`);
      }
    }

    console.log('\nVIPs data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedVips();
