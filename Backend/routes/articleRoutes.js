const express = require('express');
const router = express.Router();
const { 
    getArticles, addSection, updateSection, deleteSection, 
    updateSectionsOrder, saveArticle, deleteArticleFromSection 
} = require('../controllers/articleController');

router.get('/', getArticles);
router.post('/sections', addSection);
router.put('/sections/order', updateSectionsOrder);
router.put('/sections/:id', updateSection);
router.delete('/sections/:id', deleteSection);
router.post('/sections/:sectionId/items', saveArticle);
router.delete('/sections/:sectionId/items/:articleId', deleteArticleFromSection);

module.exports = router;
