const express = require('express');
const router = express.Router();

const courseController = require('./course.controllers');

router.post('/createCourse', courseController.createCourse);

module.exports = router;