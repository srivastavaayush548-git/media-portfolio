const FamilySection = require('../models/FamilySection');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all family sections
// @route   GET /api/family
// ... (rest of metadata)
exports.getFamilyData = async (req, res) => {
    try {
        const sections = await FamilySection.find().sort({ order: 1 });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... (skipping some exports for brevity in find but I will maintain the file structure)
// @desc    Add family section
// @route   POST /api/family/sections
exports.addSection = async (req, res) => {
    try {
        const section = await FamilySection.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update family section
// @route   PUT /api/family/sections/:id
exports.updateSection = async (req, res) => {
    try {
        const section = await FamilySection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete family section
// @route   DELETE /api/family/sections/:id
exports.deleteSection = async (req, res) => {
    try {
        await FamilySection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update sections order
// @route   PUT /api/family/sections/order
exports.updateSectionsOrder = async (req, res) => {
    try {
        const { sections } = req.body;
        const updatePromises = sections.map(sec => 
            FamilySection.findByIdAndUpdate(sec.id, { order: sec.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Sections order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add/Update image in section
// @route   POST /api/family/sections/:sectionId/images
exports.saveImage = async (req, res) => {
    try {
        const section = await FamilySection.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        let { id, title, src, order } = req.body;
        
        let imageUrl = src;
        if (src && src.startsWith('data:image')) {
            imageUrl = await uploadToCloudinary(src, 'family');
        }

        if (id) {
            // Update existing
            const imageIndex = section.images.findIndex(img => img._id.toString() === id || img.id === id);
            if (imageIndex !== -1) {
                section.images[imageIndex] = { ...section.images[imageIndex], title, src: imageUrl, order };
            }
        } else {
            // Add new
            section.images.push({ title, src: imageUrl, order });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete image from section
// @route   DELETE /api/family/sections/:sectionId/images/:imageId
exports.deleteImage = async (req, res) => {
    try {
        const section = await FamilySection.findById(req.params.sectionId);
        section.images = section.images.filter(img => img._id.toString() !== req.params.imageId && img.id !== req.params.imageId);
        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
