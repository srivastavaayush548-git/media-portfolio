const express = require('express');
const router = express.Router();
const { 
    getMedia, addSection, updateSection, deleteSection, 
    updateSectionsOrder, saveMedia, deleteMediaFromSection,
    getSignature 
} = require('../controllers/mediaController');

router.get('/', getMedia);
router.get('/signature', getSignature);
router.post('/sections', addSection);
router.put('/sections/order', updateSectionsOrder);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);
router.post('/sections/:sectionId/items', saveMedia);
router.delete('/sections/:sectionId/items/:mediaId', deleteMediaFromSection);

module.exports = router;

