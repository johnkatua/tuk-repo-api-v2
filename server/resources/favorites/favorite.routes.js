const express = require('express');
const routes = express().Router();

const favoriteController = require('./favorite.contriollers');

routes.post('/addFavPaper', favoriteController.createFavorite);

module.exports = router;