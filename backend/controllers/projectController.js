const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Filling the required Fields"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Project image is required"
      });
    }
   
    const uploadImage = await cloudinary.uploader.upload(req.file.path,{
 folder:"projects",
    });


   
    const newProject = await Project.create({
      name,
      description,
      imageUrl:uploadImage.secure_url
    });

    res.status(201).json({
      success: true,
      data: newProject
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

