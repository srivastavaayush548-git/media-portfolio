const express = require('express');
const router = express.Router();
const { 
    getArticles, addSection, updateSection, deleteSection, 
    updateSectionsOrder, saveArticle, deleteArticleFromSection 
} = require('../controllers/articleController');
const { protect } = require('../utils/authMiddleware');

router.get('/', getArticles);

// Protected routes
router.post('/sections', protect, addSection);
router.put('/sections/order', protect, updateSectionsOrder);
router.put('/sections/:id', protect, updateSection);
router.delete('/sections/:id', protect, deleteSection);
router.post('/sections/:sectionId/items', protect, saveArticle);
router.delete('/sections/:sectionId/items/:articleId', protect, deleteArticleFromSection);

module.exports = router;
