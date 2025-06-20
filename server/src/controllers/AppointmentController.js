const Patient = require("../models/Patient");
const Visit = require("../models/Visit");
const { testSelection } = require("./TestSelection/Tests");

// Schedule a New Visit
const scheduleVisit = async (req, res) => {
  try {
    const data = req.body;
    const {
      firstName,
      lastName,
      TMID,
      jobTitle,
      DOB,
      typeOfPhysical,
      service,
      status,
      appointments,
      version,
    } = data;

    if (!TMID || !firstName || !lastName || !typeOfPhysical || !service) {
      return res.status(400).json({
        success: false,
        message: "Missing required patient or visit fields.",
      });
    }

    // Check if patient already exists
    let patient = await Patient.findOne({ TMID });

    // Create new patient if not found
    if (!patient) {
      patient = new Patient({
        TMID,
        firstName,
        lastName,
        jobTitle,
        DOB,
      });

      await patient.save();
    }

    // Select tests for this visit
    const selectedTests = await testSelection(service);

    // Create the visit
    const visit = new Visit({
      patient: patient._id,
      typeOfPhysical,
      service,
      testToPerform: selectedTests,
      status: status || "Scheduled",
      appointments: appointments || [],
      version: version || 0,
    });

    const savedVisit = await visit.save();

    return res.status(201).json({
      success: true,
      patient: patient,
      visit: savedVisit,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Delete Patient
const deletePatient = async (req, res) => {
  const searchParams = req.query;
  if(!searchParams){
    return res.status(400).json({
      status:false,
      message:"No Search Criteria Provided"
    })
  };
  const patient = await Patient.find(searchParams);
  const id = patient[0]._id;
  const appointments = await Visit.find({ patient: id });
  const deletePatientRecord= async ()=>{
    
  }
  await Patient.deleteOne(searchParams);
  await 
  return res.status(200).json({
    success: true,
    id,
    appointments,
  });
};
// Get Visits
const getVisit = async (req, res) => {
  const { page = 1, limit = 10, ...searchParams } = req.query;

  try {
    const patients = await Patient.find(searchParams)
      .populate("visits")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ createdAt: -1 });

    if (patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No patients found with given criteria",
      });
    }

    return res.status(200).json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      results: patients.length,
      patients,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Edit Specific Visit
const editVisit = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete all Visits
const deleteVisits = async (req, res) => {
  try {
    await Visit.deleteMany({});
    return res.status(200).json({
      success: true,
      message: "All Visits Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete all Patients
const deletePatients = async (req, res) => {
  try {
    await Patient.deleteMany({});
    return res.status(200).json({
      success: true,
      message: "All Patients Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete specific Visit
const deleteVisit = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  scheduleVisit,
  getVisit,
  editVisit,
  deleteVisits,
  deleteVisit,
  deletePatients,
  deletePatient,
};
