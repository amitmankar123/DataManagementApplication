const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../utiles/cloudinaryConfig');
require('dotenv').config();


// Create the upload folder if it doesn't exist
const uploadPath = 'uploads/projects/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});


     const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|webp/;
       const extention = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = fileTypes.test(file.mimetype);
  if (extention && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed to upload'));
  }
};

const uploadConfig = multer({ storage, fileFilter});

module.exports = uploadConfig;

