const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // Folder where files will be saved
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // You can name this folder anything
    },

    // File naming format
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName); // Saves file as "timestamp-originalname"
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // ✅ Accept the file
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png files are allowed'), false); // ❌ Reject the file
    }
};

const upload = multer({storage,fileFilter})

module.exports = upload