const express = require('express');
const router = express.Router();

const courseController = require('./course.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllCourses', courseController.getAllCourses);
router.post('/createCourse', authorize, isAdmin, courseController.createCourse);

module.exports = router;