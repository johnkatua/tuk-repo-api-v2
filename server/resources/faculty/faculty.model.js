const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const faculty = mongoose.model('faculty', facultySchema);

module.exports = faculty;