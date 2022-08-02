const express = require('express');
const router = express.Router();

const facultyController = require('./faculty.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllFaculties', facultyController.getAllFaculties);
router.post('/createFaculty', authorize, isAdmin, facultyController.createFaculty);

module.exports = router;
