const Patient = require("../models/Patient");
const Visit = require("../models/Visit");
const {
  patientExists,
  createPatient,
  addVisit,
} = require("../controllers/misc/helpers");

// Visit Creation
const createVisit = async (req, res) => {
  // Get the data from the body
  const { ...apptData } = req.body;
  const TMID = req.body.patient.TMID;
  // If no data is sent, return a error
  if (!apptData) {
    return res.status(400).json({
      success: false,
      message: "No Team Member Data Provided",
    });
  }
  // Get the patient
  const queriedPatient = apptData.patient;
  // Check if the patiend is on the DB, if so skip
  const patient = await Patient.findOne({ TMID });
  if (!patient) {
    console.log("Patient doesnt exist creating...");
    const createdPatient = await createPatient(queriedPatient);
    console.log(createdPatient);
  }
  const visit = apptData.visit;
  // After make sure that the patient is on the DB, we add the
  const createdVisit = await addVisit(queriedPatient, visit);

  try {
    return res.status(200).json({
      success: true,
      patient: queriedPatient,
      visit: createdVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVisit = async (req, res) => {
  const { status, service, ...patientQuery } = req.query;

  try {
    let visits;

    if (Object.keys(patientQuery).length > 0) {
      // Mode 1: Filter by patient, then visits
      const patient = await Patient.findOne(patientQuery).populate("visits");

      if (!patient) {
        return res
          .status(404)
          .json({ success: false, message: "Patient not found." });
      }

      // Apply visit-level filters if needed
      visits = patient.visits;

      if (status) visits = visits.filter((v) => v.status === status);
      if (service) visits = visits.filter((v) => v.service === service);

      return res.status(200).json({
        success: true,
        patient: {
          ...patient.toObject(),
          visits,
        },
      });
    } else {
      // Mode 2: No patient query, just return visits filtered globally
      const query = {};
      if (status) query.status = status;
      if (service) query.service = service;

      visits = await Visit.find(query).populate("patient");

      return res.status(200).json({
        success: true,
        visits,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const newPatient = async (req, res) => {
  const { ...patientData } = req.body;
  if (!patientData) {
    res.status(400).json({
      success: false,
      message: "No patient Data provided",
    });
  }
  try {
    const newPatient = await Patient.create(patientData);
    return res.status(200).json({
      success: true,
      newPatient,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "TM already on database",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editPatient = async (req, res) => {
  const patientToEdit = req.query;
  const patientData = req.body;

  if (!patientData || Object.keys(patientData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No patient data provided",
    });
  }

  try {
    const editedPatient = await Patient.findOneAndUpdate(
      patientToEdit,
      { $set: patientData },
      { new: true, runValidators: true }
    );

    if (!editedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    return res.status(200).json({
      success: true,
      editedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editVisit = async (req, res) => {
  const visitToEdit = req.query._id;
  const visitData = req.body;
  console.log(visitToEdit);
  if (!visitToEdit || Object.keys(visitToEdit).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No visit ent data provided",
    });
  }

  try {
    const editedVisit = await Visit.findOneAndUpdate(
      { _id: visitToEdit },
      { $set: visitData },
      { new: true, runValidators: true }
    );

    if (!editedVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    return res.status(200).json({
      success: true,
      editedVisit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVisit = async (req, res) => {
  const visitToDelete = req.query._id;

  if (!visitToDelete) {
    return res.status(400).json({
      success: false,
      message: "No visit ID provided",
    });
  }

  try {
    const deletedVisit = await Visit.findOneAndDelete({ _id: visitToDelete });

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found or could not be deleted",
      });
    }

    return res.status(200).json({
      success: true,
      deletedVisit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePatient = async (req, res) => {
  const patientToDelete = req.query.TMID;
  console.log(patientToDelete);

  if (!patientToDelete) {
    return res.status(400).json({
      success: false,
      message: "No visit ID provided",
    });
  }

  try {
    const deletedPatient = await Patient.findOneAndDelete({
      TMID: patientToDelete,
    });

    if (!deletedPatient) {
      return res.status(404).json({
        success: false,
        message: "Visit not found or could not be deleted",
      });
    }

    return res.status(200).json({
      success: true,
      deletedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVisit,
  getVisit,
  newPatient,
  editPatient,
  editVisit,
  deleteVisit,
  deletePatient,
};
