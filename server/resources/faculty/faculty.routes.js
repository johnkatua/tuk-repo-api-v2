const express = require('express');
const router = express.Router();

const facultyController = require('./faculty.controllers');

router.post('/createFaculty', facultyController.createFaculty);

module.exports = router;
