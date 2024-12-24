const mongoose = require('mongoose')
const docotorShema = mongoose.Schema({doctorId:String,name:String,category:String,phone:String,password:String,location:String,price:Number,address:String,education:String,
    timeslots: [
        {
          time: { type: String, required: true }, 
          limit: { type: Number, required: true }
        }
      ]
})

const docotorModel = mongoose.model('doctors',docotorShema)
module.exports= docotorModel