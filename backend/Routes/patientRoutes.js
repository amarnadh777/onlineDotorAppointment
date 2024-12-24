const express =require('express')
const router = express.Router()
const {signUp,signIn,getCategory,getDoctorBycategory, availableTimeSlotsofaDocotor, bookAppointment,getMyappointments} = require("../Controllers/pateintControllers")
router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/getcategory",getCategory)
router.post("/getdoctor/category",getDoctorBycategory)
router.post("/timeslots",availableTimeSlotsofaDocotor)
router.post("/appointment",bookAppointment)
router.get("/myappointments/:patientId",getMyappointments)


module.exports = router