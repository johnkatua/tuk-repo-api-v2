const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('../course/course.model');
const Paper = require('../paper/paper.model');

const facultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    acronym: String,
    description: String
  },
  {
    timestamps: true
  }
);

facultySchema.pre('deleteOne', async function (next) {
  console.log('git');
  const facultyId = this.getQuery()['_id'];
  await Course.deleteMany({ facultyId }).exec();
  await Paper.deleteMany({ facultyId }).exec();
  next()
})

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = { Faculty };