const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('../course/course.model');

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
  const facultyId = this.getQuery()['id'];
  await Course.deleteMany({ facultyId }).exec();
  next()
})

const Faculty = mongoose.model('Faculty', facultySchema);

console.log('ran')

module.exports = { Faculty };