const express = require('express');
const router = express.Router();

const paperController = require('./paper.controllers');
const uploadFile  = require('../../utils/upload');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllPapers', paperController.getAllPapers);
router.get('/getPaper/:id', paperController.getPaper);
router.get('/getPapersbyFaculty/:id', paperController.getPapersByFaculty);
router.post('/createPaper', authorize, isAdmin, uploadFile, paperController.createPaper);
router.put('/updatePaper/:id', authorize, isAdmin, uploadFile, paperController.updatePaper);
router.delete('/deletePaper/:id', authorize, isAdmin, paperController.deletePaper);

module.exports = router;