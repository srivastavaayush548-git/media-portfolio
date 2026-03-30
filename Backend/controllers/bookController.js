const BookSection = require('../models/BookSection');
const { uploadToCloudinary } = require('../utils/cloudinary');

// @desc    Get all book sections
// @route   GET /api/books
exports.getBooks = async (req, res) => {
    try {
        const sections = await BookSection.find().sort({ order: 1 });
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add book section
// @route   POST /api/books/sections
exports.addSection = async (req, res) => {
    try {
        const section = await BookSection.create(req.body);
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update book section
// @route   PUT /api/books/sections/:id
exports.updateSection = async (req, res) => {
    try {
        const section = await BookSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete book section
// @route   DELETE /api/books/sections/:id
exports.deleteSection = async (req, res) => {
    try {
        await BookSection.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Section deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk update sections order
// @route   PUT /api/books/sections/order
exports.updateSectionsOrder = async (req, res) => {
    try {
        const { sections } = req.body;
        const updatePromises = sections.map(sec =>
            BookSection.findByIdAndUpdate(sec.id, { order: sec.order })
        );
        await Promise.all(updatePromises);
        res.status(200).json({ message: 'Sections order updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Add/Update book in section
// @route   POST /api/books/sections/:sectionId/items
exports.saveBook = async (req, res) => {
    try {
        const section = await BookSection.findById(req.params.sectionId);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        let {
            id, title, author, description, cover,
            pages, published, language, purchaseLink,
            readOnline, order, type
        } = req.body;

        let coverUrl = cover;
        if (cover && cover.startsWith('data:')) {
            const resType = cover.includes('video') ? 'video' : 'image';
            coverUrl = await uploadToCloudinary(cover, 'books/covers', resType);
        }

        if (id) {
            // Update existing
            const itemIndex = section.books.findIndex(b => b._id.toString() === id);
            if (itemIndex !== -1) {
                section.books[itemIndex] = {
                    ...section.books[itemIndex].toObject(),
                    title, author, description, cover: coverUrl,
                    pages, published, language, purchaseLink,
                    readOnline, order, type
                };
            }
        } else {
            // Add new
            section.books.push({
                title, author, description, cover: coverUrl,
                pages, published, language, purchaseLink,
                readOnline, order, type
            });
        }

        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete book from section
// @route   DELETE /api/books/sections/:sectionId/items/:bookId
exports.deleteBookFromSection = async (req, res) => {
    try {
        const section = await BookSection.findById(req.params.sectionId);
        section.books = section.books.filter(b => b._id.toString() !== req.params.bookId);
        await section.save();
        res.status(200).json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
