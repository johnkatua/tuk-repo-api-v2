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