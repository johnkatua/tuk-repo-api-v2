const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  { 
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'student',
      enum: ["student", "admin"]
    },
    accessToken: {
      type: String
    }
  },
  { timestamps: true }
);

const user = mongoose.model('user', userSchema);

module.exports = user;