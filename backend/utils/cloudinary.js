const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const validateImageType = (filename) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const extension = filename.toLowerCase().split('.').pop();
    return allowedExtensions.includes(`.${extension}`);
};

// Upload single image
const uploadImage = async (file) => {
    try {
        if (!file || !validateImageType(file.originalname)) {
            throw new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WebP images are allowed.');
        }
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'spaService',
            use_filename: true,
        });
        return result.secure_url;
    } catch (error) {
        throw new Error(error.message || 'Error uploading image to cloudinary');
    }
};

// Upload multiple images
const uploadMultipleImages = async (files) => {
    try {
        if (!files || !Array.isArray(files)) {
            throw new Error('No files provided');
        }

        for (const file of files) {
            if (!validateImageType(file.originalname)) {
                throw new Error('Invalid file type. Only JPG, JPEG, PNG, GIF, and WebP images are allowed.');
            }
        }

        const urls = [];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'spaImages',
                use_filename: true,
            });
            urls.push(result.secure_url);
        }
        return urls;
    } catch (error) {
        throw new Error(error.message || 'Error uploading images to cloudinary');
    }
};

module.exports = { uploadImage, uploadMultipleImages };
