const mongoose=require('mongoose')

const EntrySchema=new mongoose.Schema({
  age: String,
  diabetesFamily:String,
  physicalActivity:String,
  fastFoodFrequency: String,
  glucoseLevel: String,
  bloodPressure:String,
  bmi: String,
  isDiabetic: String
})

const EntryModel=mongoose.model("entries",EntrySchema)
module.exports=EntryModel