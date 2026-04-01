const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary
 * @param {string} fileStr - Base64 string of the image
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<string>} - The URL of the uploaded image
 */
const uploadToCloudinary = async (
  fileStr,
  folder = "portfolio",
  resourceType = "auto",
) => {
  try {
    // If it's already a URL, return it
    if (fileStr.startsWith("http")) return fileStr;

    // Estimate size for Base64 (string length * 0.75)
    const sizeInBytes = fileStr.length * 0.75;
    const seventyMB = 70 * 1024 * 1024;

    if (sizeInBytes > seventyMB) {
      throw new Error("File size exceeds 70MB limit");
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: folder,
      resource_type: resourceType,
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(error.message || `${resourceType} upload failed`);
  }
};

const generateSignature = (folder) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder,
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  return {
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
};

module.exports = { cloudinary, uploadToCloudinary, generateSignature };
