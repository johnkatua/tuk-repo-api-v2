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
      ref: 'Faculty',
      required: true
    }
  },
  { timestamps: true }
);

const course = mongoose.model('course', courseSchema);

module.exports = course;

// courseSchema.pre('deleteOne', function (next) {
//   let course = this;
//   course.model('paper').deleteMany({ course: course._id }, function (err, res) {
//     if (err) {
//       res.status(500).json({
//         msg: err
//       })
//       console.log(err);
//       next(err)
//     } else {
//       res.status(200).json({
//         msg: 'Delete successfully'
//       })
//       console.log('success');
//       next()
//     }
//   });
// });