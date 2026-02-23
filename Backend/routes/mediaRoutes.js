const express = require('express');
const router = express.Router();
const { getMedia, saveMedia, deleteMedia, updateMediaOrder } = require('../controllers/mediaController');

router.get('/', getMedia);
router.post('/', saveMedia);
router.put('/order', updateMediaOrder);
router.delete('/:id', deleteMedia);

module.exports = router;
