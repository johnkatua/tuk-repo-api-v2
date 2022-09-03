const Favorite = require('./favorite.model')

exports.createFavorite = async (req, res) => {
  const { paperId, paperName } = req.body;
  const userId = req.user;
  console.log(userId);
  try {
    const myPapers = await Favorite.findOne({ userId });
    if (myPapers) {
      const paperIdx = myPapers.papers.findIndex(p => p.paperId === paperId);
      if (paperIdx < -1) {
        myPapers.papers.push({ paperId, paperName });
      }
      myPapers = await myPapers.save();
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
        data: myPapers
      })
    } else {
      const newList = await Favorite.create({
        userId,
        papers: [{ paperId, paperName }]
      });
      return res.status(201).json({
        msg: 'Paper add successfully to your favorite list',
        data: newList
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong'
    })
  }
};