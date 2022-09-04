const Favorite = require('./favorite.model')

exports.createFavorite = async (req, res) => {
  const { paperId, name, file, year, academicYear, status, courseCode, courseLevel, faculty } = req.body;
  const { userId } = req.userData;
  try {
    let myPapers = await Favorite.findOne({ userId });
    if (myPapers) {
      let paperIdx = myPapers.papers.findIndex(p => p.paperId == paperId);
      if (paperIdx > -1) {
        return res.status(409).json({
          msg: 'Paper already in fav list'
        });
      } else {
        myPapers.papers.push({ paperId, name, file, year, academicYear, status, courseCode, courseLevel, faculty });
      }
      myPapers = await myPapers.save();
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
      })
    } else {
      const newList = await Favorite.create({
        userId,
        papers: [{ paperId, name, file, year, academicYear, status, courseCode, courseLevel, faculty }]
      });
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
        newList
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Something went wrong'
    })
  }
};


exports.getFavPapers = async (req, res) => {
  const { id } = req.params;
  await Favorite.find({ userId: id })
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
      if(err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: `User with an id of ${req.params.id} is not found`
        })
      }
      res.status(500).send({
        success: false,
        msg: err.message || 'Unable to fetch Papers'
      })
    })
}