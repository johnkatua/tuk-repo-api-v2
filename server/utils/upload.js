const multer = require('multer');
const { CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Paper-v2",
    allowedFormats: ['pdf'],
    pages: true,
    transformation: {
      width: 400,
      height: 600,
      crop: 'limit'
    }
  }
});

const uploadFile = multer({ storage }).single('file');

module.exports = uploadFile