const VipSection = require('../models/VipSection');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getVipsData = async (req, res) => {
    try {
        const sections = await VipSection.find().sort({ order: 1 });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSection = async (req, res) => {
    try {
        const section = await VipSection.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const section = await VipSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        await VipSection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSectionsOrder = async (req, res) => {
    try {
        const { sections } = req.body;
        const updatePromises = sections.map(sec =>
            VipSection.findByIdAndUpdate(sec.id, { order: sec.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Sections order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.saveImage = async (req, res) => {
    try {
        const section = await VipSection.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        let { id, title, src, order, type } = req.body;

        let imageUrl = src;
        if (src && src.startsWith('data:')) {
            const resType = src.includes('video') ? 'video' : 'image';
            imageUrl = await uploadToCloudinary(src, 'vips', resType);
        }

        if (id) {
            const imageIndex = section.images.findIndex(img => img._id.toString() === id || img.id === id);
            if (imageIndex !== -1) {
                section.images[imageIndex] = { ...section.images[imageIndex].toObject(), title, src: imageUrl, order, type };
            }
        } else {
            section.images.push({ title, src: imageUrl, order, type });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const section = await VipSection.findById(req.params.sectionId);
        section.images = section.images.filter(img => img._id.toString() !== req.params.imageId);
        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
