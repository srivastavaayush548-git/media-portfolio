const express = require('express');
const router = express.Router();
const {
    getVipsData, addSection, updateSection, deleteSection,
    updateSectionsOrder, saveImage, deleteImage
} = require('../controllers/vipController');
const { protect } = require('../utils/authMiddleware');

router.get('/', getVipsData);

// Protected routes
router.post('/sections', protect, addSection);
router.put('/sections/order', protect, updateSectionsOrder);
router.put('/sections/:id', protect, updateSection);
router.delete('/sections/:id', protect, deleteSection);
router.post('/sections/:sectionId/images', protect, saveImage);
router.delete('/sections/:sectionId/images/:imageId', protect, deleteImage);

module.exports = router;
