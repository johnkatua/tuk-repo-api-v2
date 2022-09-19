const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true,
      default: 'firstYear',
      enum: ['firstYear', 'secondYear', 'thirdYear', 'fourthYear']
    },
    academicYear: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "mainExam",
      enum: ['mainExam', 'cat'] 
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "faculty",
      required: true,
    }
  },
  { timestamps: true }
);

paperSchema.index({ name: 1, academicYear: 1, status: 1}, { unique: true });

const paper = mongoose.model('paper', paperSchema);

module.exports = paper;
