const express = require('express');
const router = express.Router();

const paperController = require('./paper.controllers');
const uploadFile  = require('../../utils/upload');

router.post('/createPaper', uploadFile, paperController.createPaper);

module.exports = router;