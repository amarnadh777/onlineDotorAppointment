const mongoose = require('mongoose')
const  AutoIncrement = require('mongoose-sequence')(mongoose)

const categorySchema = mongoose.Schema({ categoryId:Number ,category:String} )
categorySchema.plugin(AutoIncrement,{inc_field:"categoryId"})
const categorryModel = mongoose.model('category',categorySchema)
module.exports = categorryModel