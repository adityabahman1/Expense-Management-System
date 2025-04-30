const express = require('express')
const {protect} = require('../middlewares/authMiddlewares')
const {
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authcontroller');

const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/getUser',protect,getUserInfo)

router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    });
  });

module.exports = router;