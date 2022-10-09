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

const Faculty = mongoose.model('Faculty', facultySchema);

// const removeChildren = facultySchema.pre('remove', (next) => {
//   console.log('my object', this);
//   Course.remove({ facultyId: this._id }).exec();
//   next();
// })

const removeChildren = () => {
  facultySchema.pre('remove', (next) => {
    console.log('this', this);
    Course.remove({ facultyId: this._id });
    next();
  })
}

console.log('ran')

module.exports = {
  Faculty,
  removeChildren
};