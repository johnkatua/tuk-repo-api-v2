const mongoose = require('mongoose');
const Paper = require('../paper/paper.model');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "degree",
      enum: ["degree", "diploma", "certificate"]
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true
    }
  },
  { timestamps: true }
);

courseSchema.pre('deleteOne', async function (next) {
  const courseId = this.getQuery()['_id'];
  await Paper.deleteMany({ courseId }).exec();
  next();
})

const course = mongoose.model('Course', courseSchema);

module.exports = course;
