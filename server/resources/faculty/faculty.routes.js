const express = require('express');
const router = express.Router();

const facultyController = require('./faculty.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.post('/createFaculty', authorize, isAdmin, facultyController.createFaculty);

module.exports = router;
