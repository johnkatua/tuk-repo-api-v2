const express = require('express');
const router = express.Router();

const courseController = require('./course.controllers');
const { authorize, isAdmin } = require('../../middleware/auth');

router.get('/getAllCourses', courseController.getAllCourses);
router.get('/getCourse/:id', courseController.getCourse);
router.put('/updateCourse/:id', authorize, isAdmin, courseController.updateCourse);
router.post('/createCourse', authorize, isAdmin, courseController.createCourse);
router.delete('/deleteCourse/:id', authorize, isAdmin, courseController.deleteCourse);

module.exports = router;