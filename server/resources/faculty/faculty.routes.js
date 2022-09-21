const express = require('express');
const router = express.Router();

const facultyController = require('./faculty.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllFaculties', authorize, facultyController.getAllFaculties);
router.get('/getFaculty/:id',authorize, facultyController.getFaculty);
router.post('/createFaculty', authorize, isAdmin, facultyController.createFaculty);
router.put('/updateFaculty/:id', authorize, isAdmin, facultyController.updateFaculty);
router.delete('/deleteFaculty/:id', authorize, isAdmin, facultyController.deleteFaculty);

module.exports = router;
