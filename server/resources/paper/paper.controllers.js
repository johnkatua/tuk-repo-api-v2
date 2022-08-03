const Paper = require('./paper.model');

exports.createPaper = async (req, res) => {
  const { name, year, academicYear, status, due, courseId, facultyId } = req.body;
  const file = req.file.path;

  if(!name || !year || !academicYear || !status || !due || !courseId || !facultyId || !file) {
    return res.status(400).json({
      success: false,
      msg: 'Please fill all fields'
    })
  }

  let paper = new Paper({ name, year, academicYear, status, due, courseId, facultyId, file });

  await paper.save()
    .then(data => {
      res.status(200).json({
        success: true,
        msg: "Paper successfully created",
        data: data
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: "Please make sure you enter a valid courseId and facultyId"
        })
      }
      return res.status(500).json({
        success: false,
        msg: err.message || 'Some error occurred while adding new paper'
      })
    })
}