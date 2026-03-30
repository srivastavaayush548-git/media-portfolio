const express = require('express');
const router = express.Router();
const {
    getMedia, addSection, updateSection, deleteSection,
    updateSectionsOrder, saveMedia, deleteMediaFromSection,
    getSignature
} = require('../controllers/mediaController');
const { protect } = require('../utils/authMiddleware');

router.get('/', getMedia);

// Protected routes
router.get('/signature', protect, getSignature);
router.post('/sections', protect, addSection);
router.put('/sections/order', protect, updateSectionsOrder);
router.put('/sections/:id', protect, updateSection);
router.delete('/sections/:id', protect, deleteSection);
router.post('/sections/:sectionId/items', protect, saveMedia);
router.delete('/sections/:sectionId/items/:mediaId', protect, deleteMediaFromSection);

module.exports = router;

