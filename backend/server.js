const UserModel=require('./models/User')
const DoctorModel=require("./models/Doctor")
const EntryModel=require("./models/Entry")
const express=require('express');
const cors=require('cors');
const  mongoose  = require('mongoose');
const app=express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/Project")
.then(()=>console.log("MongoDB connected"))
.catch(()=>console.log("Not connected"))

app.post('/signup',(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post('/login',(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }
        }
        else{
            res.json("No record exists.")
        }
    })
})

app.post('/doctorSignup',(req,res)=>{
    DoctorModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post('/doctorLogin',(req,res)=>{
    const {email,password}=req.body;
    DoctorModel.findOne({email: email})
    .then(user=>{
        if(user){
            if(user.password==password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }
        }
        else{
            res.json("No record exists.")
        }
    })
})

app.post('/doctorEntry', async (req, res) => {
    try {
      const formData = req.body;
      console.log('Received data:', formData); // Check if data is received correctly
  
      // Save data to the database
      const entry = new EntryModel({
        heredity: formData.diabetesFamily,  
        physicalActivity: formData.physicalActivity,
        fastFood: formData.fastFoodFrequency,
        glucose: formData.glucoseLevel,
        bloodPressure: formData.bloodPressure,
        bmi: formData.bmi,
        age: formData.age,
        outcome: formData.isDiabetic
      });
      await entry.save();
  
      console.log('Data saved successfully');
      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    }
  });
  


app.listen(3001,()=>{
    console.log('Listening...')
})