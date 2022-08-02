const mongoose = require('mongoose');
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
      enum: ["degree", "diploma"]
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
      required: true
    }
  },
  { timestamps: true }
);

const course = mongoose.model('course', courseSchema);

module.exports = course;