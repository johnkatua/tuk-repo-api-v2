const Favorite = require('./favorite.model')

exports.createFavorite = async (req, res) => {
  const { paperId, paperName } = req.body;
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
        myPapers.papers.push({ paperId, paperName });
      }
      myPapers = await myPapers.save();
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
      })
    } else {
      const newList = await Favorite.create({
        userId,
        papers: [{ paperId, paperName }]
      });
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
        newList
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong'
    })
  }
};


exports.getFavPapers = async (req, res) => {
  await Favorite.find()
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
}