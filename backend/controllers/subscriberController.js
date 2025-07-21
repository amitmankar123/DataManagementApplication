const Subscriber = require('../models/Subscriber');

exports.createSubscriber = async (req, res) => {
    try{
        const {email} = req.body;
        const existingEmail = await Subscriber.findOne({email});
        //check the email should be in the correct format
        if(existingEmail){
            return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:"missing the some fields"
            })
        }
        const newEmail = await Subscriber.create({
            email
        })
        res.status(201).json({
            success:true,
            data:newEmail,
            message:"Subscriber created successfully"
        })

    }
    catch(error){
        console.error("Error creating subscriber:", error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

};

exports.getSubscriber = async (req,res)=>{
    try{
     const subscribers= await Subscriber.find();

     return res.status(200).json({
        success:true,
        data:subscribers
     });

    }
    catch(error){
    console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    
    }
};
