const express = require('express');
const router = express.Router();
const { 
    getFamilyData, addSection, updateSection, deleteSection, 
    updateSectionsOrder, saveImage, deleteImage 
} = require('../controllers/familyController');

router.get('/', getFamilyData);
router.post('/sections', addSection);
router.put('/sections/order', updateSectionsOrder);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);
router.post('/sections/:sectionId/images', saveImage);
router.delete('/sections/:sectionId/images/:imageId', deleteImage);

module.exports = router;
