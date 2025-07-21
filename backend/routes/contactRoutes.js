const express = require('express');
const router = express.Router();
const {createContactForm,getContactForm} = require('../controllers/contactController');

router.post('/createContactForm', createContactForm);
router.get('/getContactForm', getContactForm);


module.exports = router;    