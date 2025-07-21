const mongoose = require('mongoose');
const contactFormSchema = new mongoose.Schema({
    Full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Mobile_number: {
        type: String,
        required: true
    },
   City: {
    type: String,
    required: true
   },
  
});
module.exports = mongoose.model('ContactForm', contactFormSchema);