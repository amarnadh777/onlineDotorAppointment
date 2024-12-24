const mongoose = require('mongoose')
const patientSchema = mongoose.Schema({patientId:String,fullname:String,age:Number,phone:String,password:String})
const patientModel = mongoose.model("pateint",patientSchema)
module.exports = patientModel