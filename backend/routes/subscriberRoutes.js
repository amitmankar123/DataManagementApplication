const express = require('express');
const router = express.Router();
const {createSubscriber,getSubscriber } = require('../controllers/subscriberController');

router.post('/createSubscriber', createSubscriber);
router.get('/getSubscriber',getSubscriber);



module.exports = router;