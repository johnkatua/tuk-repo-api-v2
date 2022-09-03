const express = require('express');
const router = express.Router();

const { authorize } = require('../../middleware/auth');

const favoriteController = require('./favorite.contriollers');

router.post('/addFavPaper', authorize, favoriteController.createFavorite);
router.get('/getAllFav', favoriteController.getFavPapers);

module.exports = router;