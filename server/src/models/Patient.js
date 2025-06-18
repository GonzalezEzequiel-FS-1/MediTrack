const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  date: Date,
  type: String,
  notes: String,
  location: String,
  program: String,
}, {_id: false})

const patientSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  TMID:Number,
  DOB:Date,
  email:String,
  phone:String,
  status:String,
  appointment:[
    {
      date:Date,
      type:String,
      notes:String,
      location:String,
      program:String
    }
  ],
  createdAt:{
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Patient', patientSchema)