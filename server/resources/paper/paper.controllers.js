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
};

exports.getAllPapers = async (req, res) => {
  await Paper.find()
    .then(data => {
      let message = '';
      if (data === undefined || data.length == 0) {
        message = 'No Papers found'
      } else {
        message = 'Papers fetched successfully'
      }
      res.status(200).json({
        success: true,
        msg: message,
        data: data
      })
    }).catch(err => {
      res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch papers'
      })
    })
};

exports.getPaper = async (req, res) => {
  await Paper.findById(req.params.id)
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          msg: `Paper with an id of ${req.params.id} is not found`
        })
      }
      res.status(200).json({
        success: true,
        msg: "Paper successfully retrieved",
        data: data
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Paper with an id of ${req.params.id} is not found`
        })
      }
      return res.status(500).json({
        success: false,
        msg: `Error retrieving paper with an id of ${req.params.id}`
      })
    })
};

exports.updatePaper = async (req, res) => {
  const { name, year, academicYear, status, due, courseId, facultyId } = req.body;
  const file = req.file.path;

  await Paper.findByIdAndUpdate(req.params.id, {
    $set: { name, year, academicYear, status, due, courseId, facultyId, file }
  }, { new: true })
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          msg: `Paper with an id of ${req.params.id} is not found`
        })
      }
      res.status(200).json({
        success: true,
        msg: 'Paper updated successfully',
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Paper with an id of ${req.params.id} is not found`
        })
      }
      return res.status(500).json({
        success: false,
        msg: `Error updating course with an id of ${req.params.id}`
      })
    })
}