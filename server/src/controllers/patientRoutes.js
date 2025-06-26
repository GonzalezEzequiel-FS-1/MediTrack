const Patient = require("../models/Patient");

const {
  patientExists,
  createPatient,
  addVisit,
} = require("../controllers/misc/helpers");

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

const deletePatient = async (req, res) => {
  const patientToDelete = req.query.TMID;
  //console.log(patientToDelete);

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
  newPatient,
  editPatient,
  deletePatient,
};
