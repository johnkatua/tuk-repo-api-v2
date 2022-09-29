const Paper = require('./paper.model');

exports.createPaper = async (req, res) => {
  const { name, year, academicYear, status, courseId, facultyId } = req.body;
  const file = req.file.path;

  if(!name || !year || !academicYear || !status || !courseId || !facultyId || !file) {
    return res.status(400).json({
      success: false,
      msg: 'Please fill all fields'
    })
  }

  let paper = new Paper({ name, year, academicYear, status, courseId, facultyId, file });

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
  const { page = 1, limit = 10 } = req.query;
  const count = await Paper.countDocuments();
  await Paper.find().populate('facultyId').populate('courseId').limit(limit * 1).skip((page - 1) * limit).exec()
    .then(data => {
      let message = '';
      if (data === undefined || data.length == 0) {
        message = 'No Papers found'
      } else {
        message = 'Papers fetched successfully'
      };

      let displayedData = data.map(paper => {
        return {
          id: paper.id,
          name: paper.name,
          file: paper.file,
          year: paper.year,
          academicYear: paper.academicYear,
          status: paper.status,
          courseCode: paper.courseId.courseCode,
          courseLevel: paper.courseId.status,
          faculty: paper.facultyId.acronym,
          facultyId: paper.facultyId._id
        };
      });
      res.status(200).json({
        success: true,
        msg: message,
        data: displayedData,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
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
        msg: `Error updating paper with an id of ${req.params.id}`
      })
    })
};

exports.deletePaper = async (req, res) => {
  await Paper.findByIdAndDelete(req.params.id)
    .then(data => {
      if(!data) {
        return res.status(404).json({
          success: false,
          msg: `Paper with an id of ${req.params.id} is not found`
        })
      }
      res.status(200).json({
        success: true,
        msg: 'Paper deleted successfully'
      })
    }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).json({
          success: false,
          msg: `Could not delete paper with an id of ${req.params.id}`
        })
      }
    })
};

exports.getPapersByFaculty = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const count = await Paper.countDocuments();
  await Paper.find({ facultyId: id }).populate('facultyId').populate('courseId').limit(limit * 1).skip((page - 1) * limit).exec()
    .then(data => {
      if(!data) {
        return res.status(400).json({
          success: false,
          msg: `Faculty with an id of ${id} is not found`
        })
      };
      let msg = '';
      if(data === undefined || data.length === 0) {
        msg = 'No papers found under this faculty'
      } else {
        msg = 'Papers fetched successfully'
      }

      let displayedData = data.map(paper => {
        return {
          name: paper.name,
          file: paper.file,
          year: paper.year,
          academicYear: paper.academicYear,
          status: paper.status,
          courseCode: paper.courseId.courseCode,
          courseLevel: paper.courseId.status,
          faculty: paper.facultyId.acronym
        };
      });
      res.status(200).json({
        success: true,
        msg: msg,
        data: displayedData,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Faculty with an id of ${id} is not found`
        })
      }
      return res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch papers'
      })
    })
};

exports.getPapersByCourse = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const count = await Paper.countDocuments();
  await Paper.find({ courseId: id }).populate('facultyId').populate('courseId').limit(limit * 1).skip((page - 1) * limit).exec()
    .then(data => {
      if(!data) {
        return res.status(400).json({
          success: false,
          msg: `Course with an id of ${id} is not found`
        })
      };
      let msg = '';
      if(data === undefined || data.length === 0) {
        msg = 'No papers found under this course'
      } else {
        msg = 'Papers fetched successfully'
      }

      let displayedData = data.map(paper => {
        return {
          name: paper.name,
          file: paper.file,
          year: paper.year,
          academicYear: paper.academicYear,
          status: paper.status,
          courseCode: paper.courseId.courseCode,
          courseLevel: paper.courseId.status,
          faculty: paper.facultyId.acronym
        };
      });
      res.status(200).json({
        success: true,
        msg: msg,
        data: displayedData,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `Course with an id of ${id} is not found`
        })
      }
      return res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch papers'
      })
    })
};


