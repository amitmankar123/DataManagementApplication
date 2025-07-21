const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const uploadConfig = require('../middlewares/uploadConfig');

router.post('/createProject', uploadConfig.single('image'), createProject);
router.get('/getProjects', getProjects);

module.exports = router;
