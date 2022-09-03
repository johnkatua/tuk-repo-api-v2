const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    papers: [
      {
        paperId: Number,
        paperName: String
      }
    ]
  },
  { timestamps: true }
);

const favorite = mongoose.model('favorite', favoriteSchema);

module.exports = favorite;