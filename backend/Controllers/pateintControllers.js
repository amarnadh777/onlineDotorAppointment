const appointmentModel = require("../Model/appointmentModel");
const categorryModel = require("../Model/categoryModel");
const docotorModel = require("../Model/doctorModel");
const patientModel = require("../Model/pateintModel");
const crypto = require("crypto");

const signUp = async (req, res) => {
  try {
    const { fullname, password, age, phone } = req.body;

    if (!fullname || !password || !age || !phone) {
      return res.json({ message: "please etner all fields" });
    }
    const existingPatient = await patientModel.findOne({ phone: phone });
    if (existingPatient) {
      return res.status(400).json({ message: "Phone number already exist" });
    }
    const patientId = crypto.randomBytes(4).toString("hex");
    const newPatientModel = new patientModel({
      patientId: patientId,
      fullname: fullname,
      age: age,
      phone: phone,
      password:password
    });
    newPatientModel.save();
    res.json({ message: "user created" });
  } catch (error) {}
};
const signIn = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!password || !phone) {
      return res.json({ message: "please enter all fields" });
    }

    const patient = await patientModel.findOne({phone:phone});

    if (!patient) {
      return res.status(404).json({ message: "user doesnot exist" });
    }

    if (patient.password != password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login successful"  ,patientData:{patientId:patient.patientId,fullname:patient.fullname,
      email:patient.email,phone:patient.phone,age:patient.age
    } });
  } catch (error) {
    console.log(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const response = await categorryModel.find({});
    res.json({ category: response });
  } catch (error) {}
};

const getDoctorBycategory = async (req, res) => {
  try {
    const { category, location } = req.body;
    if (!category) {
      return res.json({ message: "please enter all fields" });
    }
    const docotors = await docotorModel.find({ category: category });
    res.json(docotors);
  } catch (error) {}
};

const availableTimeSlotsofaDocotor = async (req, res) => {
  try {

    const { doctorid , date } = req.body;
    if(!doctorid || !date)
    {
      res.json({message:"please enter all fields"})
    }
   
    const doctor = await docotorModel.findOne({ doctorId: doctorid });
    const timeslots = doctor.timeslots
    const avilalbletimeslots = await Promise.all(
        timeslots.map(async (each) => {
            const count = await appointmentModel.countDocuments({ time: each.time , date:date });
            const avialble = each.limit - count 

            if(avialble <=0 )
            {
                return { time: each.time, available: 0 }; 
            }
            return { time: each.time, available: avialble }; 
        })
    );

  
    res.json(avilalbletimeslots);
  } catch (error) {}
};

const bookAppointment = async (req, res) => {
  try {

    const { doctorid, patientid, time, fullname, email, mobile ,date } = req.body;

    if (!doctorid || !patientid || !time || !fullname || !email || !mobile || !date) {
        return res.status(400).json({ 
            message: "All fields are required " 
        });
    }


    const doctor = await docotorModel.findOne({ doctorId: doctorid });
    const patient = await patientModel.findOne({patientId:patientid})
    if(!doctor)
        {
          return res.json({message:"Doctor not found"})
        }
       
        if(!patient)
           {
            return  res.json({message:" pateint not found"})
           }
    const timeslots = doctor.timeslots
    const timeExist = timeslots.some((each) => each.time === time)
    if(!timeExist)
    {
        return res.status(400).json({ 
            message: "time slot not exist " 
        });
    }


     const count = await appointmentModel.countDocuments({ time: time });
     const findTIme =timeslots.find(slot => slot.time === time)
     const avialble =  findTIme.limit -  count 
     if(avialble <= 0 )
     {
        return res.json({message:" time slot fullybooked"})
     }

  const newAppointment = new appointmentModel({patientId:patientid,docotorId:doctorid,doctor:doctor._id ,time:time,email:email,mobile:mobile,fullname:fullname,
    date: date
  })
  await newAppointment.save()
   res.json(newAppointment)
  } catch (error) {
    console.log(error)
  }
};

const getMyappointments = async(req,res) =>
{
  try {
    const {patientId} = req.params

    if(!patientId)
    {
      return res.status(400).json({ 
        message: "Please enter patient id " 
    });
    }
    const patient = await patientModel.findOne({patientId:patientId})
    if(!patient)
    {
      return res.status(400).json({ 
        message: "Patient doesnot exist" 
    });
    }
    const appointments =  await appointmentModel.find({patientId:patientId}).populate('doctor')
    
    res.json({appointments})
    
    
  } catch (error) {
    
  }

}
module.exports = {
  signUp,
  signIn,
  getCategory,
  bookAppointment,
  getDoctorBycategory,
  getMyappointments,
  availableTimeSlotsofaDocotor,

};
