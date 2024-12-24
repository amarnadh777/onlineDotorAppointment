const docotorModel = require('../Model/doctorModel')
const crypto = require('crypto')

const signUp = async(req,res) =>
{

 
    try {
        const {name,password,phone,category,location,price,address,education} = req.body
    
       
        if(!name || !password ||  !phone || !category || !location || !price || !address || !education )
        { 
           
            return  res.json({message:"please etner all fields"})

        }
        const existingDoctor = await docotorModel.findOne({ phone:phone });
        if (existingDoctor) {
            return res.status(400).json({ message: "Phone number already exist" });
        }
        const doctorId  = crypto.randomBytes(4).toString('hex')
        const newDoctorModel = new docotorModel({doctorId:doctorId,name:name,phone:phone,password:password,category:category,
            location:location,price:price,address:address,education:education
        })
        newDoctorModel.save()
        res.json({message:"Doctor account created"})

    } catch (error) {
        
    }

}
const signIn = async(req,res) =>
    {
    
            try {
               
            
        const {password,phone} = req.body
         
                if( !password || !phone   )
                { 
                
                    return  res.json({message:"please etner all fields"})
        
                }
            
    
                const doctor = await docotorModel.findOne({phone:phone});
    
        
            if(!doctor)
            {
                return res.status(404).json({message:"user doesnot exist"})
            }
            if(doctor.password !== password)
            {
                return res.json({ message: "Invalid password" });
            }
            return res.json({ message: "Login successful" });
        } catch (error) {
            console.log(error)
            
        }
    
    }


    const addTimeslots = async(req,res) =>
    {
        try {
            console.log("dd")
            const {doctorid,time,limit} = req.body
            const doctor = await docotorModel.findOne({doctorId: doctorid });
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found." });
            }
            const updatedDoctor = await docotorModel.findOneAndUpdate(
                { doctorId: doctorid }, // Find doctor by doctorId
                { $push: { timeslots: { time, limit } } }, // Push both time and limit to the timeslots array
                { new: true, useFindAndModify: false } // Return the updated document
            );
            
            res.json({ message: "Time slot added successfully.", doctor: updatedDoctor });
        } catch (error) {
            console.log(error)
            
        }
    }
module.exports = {signUp,signIn,addTimeslots}