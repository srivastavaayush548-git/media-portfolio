const MediaSection = require('../models/MediaSection');
const { uploadToCloudinary, generateSignature } = require('../utils/cloudinary');

// @desc    Get all media sections
// @route   GET /api/media
exports.getMedia = async (req, res) => {
    try {
        const sections = await MediaSection.find().sort({ order: 1 });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add media section
// @route   POST /api/media/sections
exports.addSection = async (req, res) => {
    try {
        const section = await MediaSection.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update media section
// @route   PUT /api/media/sections/:id
exports.updateSection = async (req, res) => {
    try {
        const section = await MediaSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete media section
// @route   DELETE /api/media/sections/:id
exports.deleteSection = async (req, res) => {
    try {
        await MediaSection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update sections order
// @route   PUT /api/media/sections/order
exports.updateSectionsOrder = async (req, res) => {
    try {
        const { sections } = req.body;
        const updatePromises = sections.map(sec => 
            MediaSection.findByIdAndUpdate(sec.id, { order: sec.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Sections order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add/Update media in section
// @route   POST /api/media/sections/:sectionId/items
exports.saveMedia = async (req, res) => {
    try {
        const section = await MediaSection.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

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
            // Update existing
            const itemIndex = section.media.findIndex(m => m._id.toString() === id);
            if (itemIndex !== -1) {
                section.media[itemIndex] = { ...section.media[itemIndex], title, description, type, src: mediaUrl, thumbnail: thumbnailUrl, order };
            }
        } else {
            // Add new
            section.media.push({ title, description, type, src: mediaUrl, thumbnail: thumbnailUrl, order });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Cloudinary signature
// @route   GET /api/media/signature
exports.getSignature = async (req, res) => {
    try {
        const { folder } = req.query;
        const signatureData = generateSignature(folder || 'media');
        res.status(200).json(signatureData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete media from section
// @route   DELETE /api/media/sections/:sectionId/items/:mediaId
exports.deleteMediaFromSection = async (req, res) => {
    try {
        const section = await MediaSection.findById(req.params.sectionId);
        section.media = section.media.filter(m => m._id.toString() !== req.params.mediaId);
        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

