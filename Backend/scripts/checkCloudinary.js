const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const checkStatus = async () => {
    try {
        console.log('--- Cloudinary Status Check ---');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        
        // ping the api
        const result = await cloudinary.api.usage();
        console.log('Connection: SUCCESS');
        console.log('Plan:', result.plan);
        console.log('Usage:', `${result.credits_usage}% of ${result.credits_limit} credits`);
        console.log('-------------------------------');
        return true;
    } catch (error) {
        console.error('--- Cloudinary Status Check ---');
        console.error('Connection: FAILED');
        console.error('Error:', error.message);
        console.error('-------------------------------');
        return false;
    }
};

if (require.main === module) {
    checkStatus();
}

module.exports = checkStatus;
