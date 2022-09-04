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
        name: String,
        file: String,
        year: String,
        academicYear: String,
        status: String,
        courseCode: String,
        courseLevel: String,
        faculty: String
      }
    ]
  },
  { timestamps: true }
);

const favorite = mongoose.model('favorite', favoriteSchema);

module.exports = favorite;