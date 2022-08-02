const Faculty = require('./faculty.model');

exports.createFaculty = async (req, res) => {
  const { name, acronym } = req.body;
  if (!name || !acronym) {
    return res.status(400).json({
      success: false,
      msg: 'Please enter all details'
    });
  };

  const faculty = await Faculty.findOne({ name });
  if (faculty) {
    return res.status(409).json({
      success: false,
      msg: 'Faculty already exists'
    })
  };

  let newFaculty = new Faculty({ name, acronym });

  await newFaculty.save()
    .then(data => {
      res.status(200).json({
        success: true,
        msg: 'Faculty successfully created',
        data: data
      })
    }).catch(err => {
        res.status(500).json({
          success: false,
          msg: err.message || 'Unable to create faculty'
        });
    });
};

exports.getFaculty = async (req, res) => {

}

exports.getAllFaculties = async (req, res) => {
  await Faculty.find()
    .then(data => {
      let message = '';
      if (data === undefined || data.length == 0) {
        message = 'No Faculties found'
      } else {
        message = 'Faculties fetched successfully'
      }
      res.status(200).json({
        success: true,
        msg: message,
        data: data
      })
    }).catch(err => {
      res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch faculties'
      })
    })
};