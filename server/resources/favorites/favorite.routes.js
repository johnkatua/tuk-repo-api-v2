const express = require('express');
const router = express.Router();

const favoriteController = require('./favorite.contriollers');

router.post('/addFavPaper', favoriteController.createFavorite);

module.exports = router;