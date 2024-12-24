const categorryModel = require("../Model/categoryModel")
const createCategory = async(req,res) =>
{
    try {
        

   const  {category} = req.body
   const newCategory = await categorryModel({category:category})
    newCategory.save()
    res.json({message:"category created"})
    } catch (error) {
        
    }
}
module.exports = {createCategory}