const express = require('express');
const router = express.Router();

const { authorize } = require('../../middleware/auth');

const favoriteController = require('./favorite.contriollers');

router.post('/addFavPaper', authorize, favoriteController.createFavorite);
router.get('/getAllFav/:id', favoriteController.getFavPapers);
router.delete('/deletePaper', authorize, favoriteController.deletePaper);

module.exports = router;