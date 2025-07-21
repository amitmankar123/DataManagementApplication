const express = require('express');
const router = express.Router();
const {createClient,getClients} = require('../controllers/clientController');
const uploadConfig = require('../middlewares/uploadConfig');
// const { uploadMiddleware, handleUploadError } = require('../middlewares/multer.middleware');

router.post('/createClient', uploadConfig.single('image'), createClient);
router.get('/getClients', getClients);

module.exports = router; 