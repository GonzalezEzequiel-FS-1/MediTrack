const Patient = require('../models/Patient');

const createPatient = async (req, res)=>{
  const patient = req.body;
  if(!patient || patient === null){
    res.status(400).json({
      success:false,
      message:"No Patient Data Provided."
    })
    return
  }
  try {
    const newPatient = new Patient(patient)
    const savedPatient = await newPatient.save();
    console.log(savedPatient)
    if(savedPatient){
      res.status(200).json({
        success:true,
        patientData:newPatient
      })
    }
    return
  } catch (err) {
    res.status(500).json({
      success:false,
      error:err.message
    })
  }
}
module.exports = {
  createPatient
}