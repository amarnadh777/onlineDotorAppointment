const mongoose = require('mongoose')
const appointmentSchema = mongoose.Schema({appointmentId:String,  date: { type: String, required: true },time:String,mobile:String,email:String,fullname:String,docotorId:String,patientId:String,doctor:{type:mongoose.Schema.Types.ObjectId , ref:"doctors" },})
const appointmentModel = mongoose.model('appointment',appointmentSchema)
module.exports = appointmentModel