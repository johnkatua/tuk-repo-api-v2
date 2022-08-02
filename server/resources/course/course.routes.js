const express = require('express');
const router = express.Router();

const courseController = require('./course.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllCourses', courseController.getAllCourses);
router.get('/getCourse/:id', courseController.getCourse);
router.post('/createCourse', authorize, isAdmin, courseController.createCourse);

module.exports = router;