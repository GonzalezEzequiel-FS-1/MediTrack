const Patient = require("../models/Patient");
const Visit = require("../models/Visit");
const { testSelection } = require("./TestSelection/Tests");
const mongoose = require("mongoose");

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
// Get a Spefic visit
const getVisit = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "No appointment ID provided",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid _id format",
    });
  }
  const visit = await Visit.findById(id);
  if (!visit) {
    return res.status(401).json({
      success: false,
      message: `Appointment with ID ${id} not found in database`,
    });
  }
  try {
    return res.status(200).json({
      success: true,
      visit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// Get Visits
const getVisits = async (req, res) => {
  const { page, limit, ...query } = req.query;

  try {
    // 1. Find the patient
    const patient = await Patient.findOne(query);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    const totalCount = await Visit.countDocuments({ patient: patient._id });
    let visitsQuery = Visit.find({ patient: patient._id }).sort({
      createdAt: -1,
    });

    // 2. Apply pagination only if page and limit are present
    if (page && limit) {
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      visitsQuery = visitsQuery
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    }

    const visits = await visitsQuery;

    return res.status(200).json({
      success: true,
      results: visits.length,
      totalCount,
      patient: {
        _id: patient._id,
        fullName: patient.fullName,
        TMID: patient.TMID,
      },
      results: visits.length,
      paginated: !!(page && limit),
      visits,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Edit Specific Visit
const editVisit = async (req, res) => {
  const id = req.query.id;
  const dataToEdit = req.body;
  if (!id || !dataToEdit) {
    return res.status(400).json({
      success: false,
      message: "No appointment ID or Data provided",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid _id format",
    });
  }

  const editedVisit = await Visit.findOneAndUpdate(
    { _id: id },
    { $set: dataToEdit },
    { new: true, runValidators: true }
  );
  if (!editedVisit) {
    return res.status(401).json({
      success: false,
      message: `Visit with ID ${id} not found.`,
    });
  }
  try {
    return res.status(200).json({
      id,
      editedVisit,
      dataToEdit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Edit Patient
const editPatient = async (req, res) => {
  const { ...patientToEdit } = req.query;
  const dataToEdit = req.body;
  if (!patientToEdit || Object.keys(dataToEdit).length === 0) {
    return res.status(400).json({
      success: false,
      message: `No data provided.`,
    });
  }
  try {
    const editedPatient = await Patient.findOneAndUpdate(
      { ...patientToEdit },
      { $set: dataToEdit },
      { new: true, runValidators: true }
    );
    if (!editedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }
    res.status(200).json({
      success: true,
      editedPatient,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete all Visits
const deleteAllVisits = async (req, res) => {
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
const deleteAllPatients = async (req, res) => {
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
  const visitToDelete = req.query;
  console.log(visitToDelete);
  if (!visitToDelete.id) {
    return res.status(400).json({
      success: false,
      message: "No appointment ID provided for deletion",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(visitToDelete.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid _id format",
    });
  }

  try {
    const result = await Visit.deleteOne({ _id: visitToDelete.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No visit found with that ID",
      });
    }

    res.status(200).json({
      success: true,
      message: `Visit with ID ${visitToDelete.id} deleted`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete Specific Patient
const deletePatient = async (req, res) => {
  const searchParams = req.query;

  if (!searchParams || Object.keys(searchParams).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No Search Criteria Provided",
    });
  }

  try {
    const patient = await Patient.findOne(searchParams);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const appointments = await Visit.find({ patient: patient._id });

    // Delete Patient & Visits
    await Patient.deleteOne({ _id: patient._id });
    await Visit.deleteMany({ patient: patient._id });

    return res.status(200).json({
      success: true,
      deletedPatientId: patient._id,
      deletedVisitsCount: appointments.length,
      appointments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  editPatient,
  scheduleVisit,
  getVisit,
  getVisits,
  editVisit,
  deleteAllVisits,
  deleteVisit,
  deleteAllPatients,
  deletePatient,
};
