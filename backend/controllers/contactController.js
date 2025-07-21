const ContactForm = require('../models/ContactForm');

exports.createContactForm = async (req, res) => {
    try{
        const {Full_name, email, Mobile_number, City} = req.body;
        if(!Full_name || !email || !Mobile_number || !City){
            return res.status(400).json({
                success:false,
                message:"missing the some fields"
            })
        }

        const newContactForm = await ContactForm.create({
            Full_name,
            email,
            Mobile_number,
            City
        })

        res.status(201).json({
            success:true,
            data:newContactForm,
            message:"Contact form created successfully"
        })


    }  
    catch(error){
        console.error("Error creating contact form:", error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}

exports.getContactForm = async (req, res) => {
    try{
        const contactForm = await ContactForm.find();
        res.status(200).json(contactForm);
        
        }
    catch(error){
        console.error("Error get  contact form:", error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
}   
}