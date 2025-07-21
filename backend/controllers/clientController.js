const Client = require('../models/Client');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.createClient = async (req, res) => {
   try{
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "missing the some fields"
        });
    }

    const {name, description, designation} = req.body;
    
    if (!name || !description || !designation) {
        return res.status(400).json({
            success: false,
            message: "should be filled all the  fields"
        });
    }
    
  
    let imageUrl = null;
    if (!req.file) {   
        return res.status(400).json({
            success: false,
            message: "Client image is required"
        });
    }
    const uploadImage = await cloudinary.uploader.upload(req.file.path,{
        folder:"clients",
    });
    
    const newClient = await Client.create({
        name, 
        description,
        designation,
        imageUrl: uploadImage.secure_url
    });
   
    res.status(201).json({
        success: true,
        data: newClient
    });
   }
   catch(error){
    console.log("Error creating client:", error);
    res.status(400).json({
        success: false,
        message: error.message
    });
   }
}; 

exports.getClients = async (req, res) => {
    try{
        const clients = await Client.find();
        res.status(200).json({
            success: true,
            data: clients
        });
    }
    catch(error){
        console.log("Error getting clients:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
