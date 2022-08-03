const express = require('express');
const router = express.Router();

const paperController = require('./paper.controllers');
const uploadFile  = require('../../utils/upload');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllPapers', paperController.getAllPapers);
router.post('/createPaper', authorize, isAdmin, uploadFile, paperController.createPaper);

module.exports = router;