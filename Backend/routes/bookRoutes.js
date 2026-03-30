const express = require('express');
const router = express.Router();
const {
    getBooks, addSection, updateSection, deleteSection,
    updateSectionsOrder, saveBook, deleteBookFromSection
} = require('../controllers/bookController');
const { protect } = require('../utils/authMiddleware');

router.get('/', getBooks);

// Protected routes
router.post('/sections', protect, addSection);
router.put('/sections/order', protect, updateSectionsOrder);
router.put('/sections/:id', protect, updateSection);
router.delete('/sections/:id', protect, deleteSection);
router.post('/sections/:sectionId/items', protect, saveBook);
router.delete('/sections/:sectionId/items/:bookId', protect, deleteBookFromSection);

module.exports = router;
