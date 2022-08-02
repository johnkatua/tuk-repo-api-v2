const express = require('express');
const router = express.Router();

const paperController = require('./paper.controllers');

router.post('/createPaper', paperController.createPaper);

module.exports = router;