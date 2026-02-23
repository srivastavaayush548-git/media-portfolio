const Media = require('../models/Media');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all media
// @route   GET /api/media
exports.getMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ order: 1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create/Update media
// @route   POST /api/media
exports.saveMedia = async (req, res) => {
    try {
        let { id, title, description, type, src, thumbnail, order } = req.body;
        
        let mediaUrl = src;
        if (src && src.startsWith('data:')) {
            const resourceType = type === 'video' ? 'video' : 'image';
            mediaUrl = await uploadToCloudinary(src, 'media', resourceType);
        }

        let thumbnailUrl = thumbnail;
        if (thumbnail && thumbnail.startsWith('data:image')) {
            thumbnailUrl = await uploadToCloudinary(thumbnail, 'media/thumbnails', 'image');
        }

        if (id) {
            const media = await Media.findByIdAndUpdate(id, {
                title, description, type, src: mediaUrl, thumbnail: thumbnailUrl, order
            }, { new: true });
            res.status(200).json(media);
        } else {
            const media = await Media.create({
                title, description, type, src: mediaUrl, thumbnail: thumbnailUrl, order
            });
            res.status(201).json(media);
        }
    } catch (error) {
        console.error('Save Media Error:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
exports.deleteMedia = async (req, res) => {
    try {
        await Media.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Media deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update media order
// @route   PUT /api/media/order
exports.updateMediaOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const updatePromises = items.map(item => 
            Media.findByIdAndUpdate(item.id, { order: item.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Media order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
