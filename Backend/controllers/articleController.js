const ArticleSection = require('../models/ArticleSection');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all article sections
// @route   GET /api/articles
exports.getArticles = async (req, res) => {
    try {
        const sections = await ArticleSection.find().sort({ order: 1 });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add article section
// @route   POST /api/articles/sections
exports.addSection = async (req, res) => {
    try {
        const section = await ArticleSection.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update article section
// @route   PUT /api/articles/sections/:id
exports.updateSection = async (req, res) => {
    try {
        const section = await ArticleSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete article section
// @route   DELETE /api/articles/sections/:id
exports.deleteSection = async (req, res) => {
    try {
        await ArticleSection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update sections order
// @route   PUT /api/articles/sections/order
exports.updateSectionsOrder = async (req, res) => {
    try {
        const { sections } = req.body;
        const updatePromises = sections.map(sec => 
            ArticleSection.findByIdAndUpdate(sec.id, { order: sec.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Sections order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add/Update article in section
// @route   POST /api/articles/sections/:sectionId/items
exports.saveArticle = async (req, res) => {
    try {
        const section = await ArticleSection.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        let { id, title, src, alt, order } = req.body;
        
        let imageUrl = src;
        if (src && src.startsWith('data:image')) {
            imageUrl = await uploadToCloudinary(src, 'articles');
        }

        if (id) {
            // Update existing
            const itemIndex = section.articles.findIndex(art => art._id.toString() === id);
            if (itemIndex !== -1) {
                section.articles[itemIndex] = { ...section.articles[itemIndex], title, src: imageUrl, alt, order };
            }
        } else {
            // Add new
            section.articles.push({ title, src: imageUrl, alt, order });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete article from section
// @route   DELETE /api/articles/sections/:sectionId/items/:articleId
exports.deleteArticleFromSection = async (req, res) => {
    try {
        const section = await ArticleSection.findById(req.params.sectionId);
        section.articles = section.articles.filter(art => art._id.toString() !== req.params.articleId);
        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
