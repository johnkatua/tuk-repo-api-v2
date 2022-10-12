const Course = require('./course.model');

exports.createCourse = async (req, res) => {
  const { name, courseCode, status, facultyId } = req.body;
  if(!name || !courseCode || !status || !facultyId) {
    return res.status(400).json({
      success: false,
      msg: "Please enter all the details"
    })
  }

  const course = await Course.findOne({ name });
  if(course) {
    return res.status(409).json({
      success: false,
      msg: 'Course already exists'
    })
  }

  let newCourse = new Course({ name, courseCode, status: status || 'degree', facultyId });

  await newCourse.save()
    .then(data => {
      res.status(200).json({
        success: true,
        msg: "Course successfully created",
        data: data
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Faculty with an id of ${facultyId} is not found`
        })
      }
      return res.status(500).json({
        success: false,
        msg: err.message || 'Some error occurred while creating the course'
      })
    })
};

exports.getAllCourses = async (req, res) => {
  await Course.find()
    .then(data => {
      let message = '';
      if (data === undefined || data.length == 0) {
        message = 'No Courses found'
      } else {
        message = 'Courses fetched successfully'
      }
      res.status(200).json({
        success: true,
        msg: message,
        data: data
      })
    }).catch(err => {
      res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch courses'
      })
    })
};

exports.getCourse = async (req, res) => {
  await Course.findById(req.params.id)
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          msg: `Course with an id of ${req.params.id} is not found`
        })
      }
      res.status(200).json({
        success: true,
        msg: "Course successfully retrieved",
        data: data
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Course with an id of ${req.params.id} is not found`
        })
      }
      return res.status(500).json({
        success: false,
        msg: `Error retrieving course with an id of ${req.params.id}`
      })
    })
};

exports.updateCourse = async (req, res) => {
  const { name, courseCode, status, facultyId } = req.body;
  if(!name || !courseCode || !status || !facultyId) {
    return res.status(400).json({
      success: false,
      msg: 'Please enter all details'
    })
  }

  await Course.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          msg: `Course with an id of ${req.params.id} is not found`
        })
      }
      res.status(200).json({
        success: true,
        msg: 'Course updated successfully',
        data
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Course with an id of ${req.params.id} is not found`
        })
      }
      return res.status(500).json({
        success: false,
        msg: `Error updating course with an id of ${req.params.id}`
      })
    })
}

exports.deleteCourse = async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      msg: 'Course deleted successfully'
    });
  } catch (error) {
    if (error.kind === 'ObjectId' || error.name === 'Not Found') {
      return res.status(500).json({
        success: false,
        msg: error.message
      })
    }
  }
}
